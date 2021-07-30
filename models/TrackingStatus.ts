import {Shipment} from "~/models/Shipment";

export interface TrackingStatus {
  id: number
  status: string
  price: number
  discount?: number
  courierCode: string
  shipment: Shipment
  courierTrackingCode: string
  timestamp: string
}
