import { Plugin } from '@nuxt/types'
import moment from 'moment'
import { columns } from '~/static/ShipmentColumns'
import { Batch, ProductVariation, ShipmentFilter, ShipmentLine } from '~/types/shipment.type'

declare module 'vue/types/vue' {
  interface Vue {
    $batchSelection(originalData: ShipmentLine[]): string[]
    $itemSelection(originalData: ShipmentLine[]): string[]
  }
}

const getBatchName = (originalData: ShipmentLine[]): string[] => {
  return [
    ...new Set(
      originalData
        .filter(item => item.batch !== null)
        .map(item => item.batch!.name)
    )
  ]
}

const getItemName = (originalData: ShipmentLine[]): string[] => {
  return originalData
    .map(item => item.shipmentItem)
    .reduce<string[]>((accum, shipmentItem) => {
      if (shipmentItem.length > 0) {
        shipmentItem.forEach((item) => {
          if (!accum.includes(item.name)) {
            accum.push(item.name)
          }
        })
      }
      return accum
    }, [])
}

const filterDate = (date: Date, formDate: string) => {
  return moment(date).format('YYYY-MM-DD') === formDate
}

const filterBatch = (batch: Batch | null, formBatch: string) => {
  if (batch !== null) { return batch.name === formBatch }
  return false
}

const filterShipment = (shipmentItem: ProductVariation[], formShipmentItem: string) => {
  return shipmentItem.map(item => item.name).includes(formShipmentItem)
}

const searchRecords = (row: ShipmentLine, searchString: string) => {
  const columsDataIndex = columns.filter(column => column.dataIndex).map(column => column.dataIndex)
  const searchedArray = columsDataIndex.map(col => String(row[col as keyof ShipmentLine]).includes(searchString))
  return searchedArray.some(Boolean)
}

const filterFields = (key: string, row: ShipmentLine, filterForm: ShipmentFilter): boolean => {
  if (key === 'created_date') { return filterDate(row.created_date, filterForm.created_date) }
  if (key === 'batch') { return filterBatch(row.batch, filterForm.batch) }
  if (key === 'shipmentItem') { return filterShipment(row.shipmentItem, filterForm.shipmentItem) }
  return searchRecords(row, filterForm.search)
}

const filterData = (originalData: ShipmentLine[], filterForm: ShipmentFilter): ShipmentLine[] => {
  return originalData.filter((row) => {
    const result: boolean[] = []
    Object.keys(filterForm).forEach((key) => {
      result.push(
        filterForm[key as keyof ShipmentFilter] !== '' ? filterFields(key, row, filterForm) : true
      )
    })
    return result.every(Boolean)
  })
}

const shipmentPlugin: Plugin = (_context, inject) => {
  inject('batchSelection', (originalData: ShipmentLine[]) => getBatchName(originalData))
  inject('itemSelection', (originalData: ShipmentLine[]) => getItemName(originalData))
  inject('filterShipment', (originalData: ShipmentLine[], filterForm: ShipmentFilter) => filterData(originalData, filterForm))
}

export default shipmentPlugin
