import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import moment from "moment";
import { IOrder } from "~/types/order.type";

type Status = "wait" | "print" | "out" | "received";

const randomCID = (): string => {
  return String(
    Math.floor(Math.random() * (9999999999999 - 1111111111111 + 1)) +
      1111111111111
  );
};

const randomDate = (): number => {
  return (
    Math.floor(Math.random() * (1627572799000 - 1627171200000 + 1)) +
    1627171200000
  );
};

const formatPhoneNumber = () => {
  const cleaned = ("" + randomCID()).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
  }
  return "";
};

@Module({ name: "order", stateFactory: true, namespaced: true })
export default class Order extends VuexModule {
  orderList: IOrder[] = [];

  public get getOrderList(): IOrder[] {
    return this.orderList;
  }

  public get getOrderListLength(): number {
    return this.orderList.length;
  }

  @Mutation
  SET_ORDER_LIST(payload: IOrder[]) {
    this.orderList = payload;
  }

  @Mutation
  UPDATE_ORDER(payload: IOrder) {
    this.orderList = this.orderList.map(order =>
      order.orderId === payload.orderId ? payload : order
    );
  }

  @Mutation
  SET_BATCH_NUM(payload: { batchNo: string; selectedRows: string[] }) {
    this.orderList.forEach(item => {
      if (payload.selectedRows.includes(item.orderId)) {
        item.exportBatch = payload.batchNo;
      }
    });
  }

  @Mutation
  SET_STATUS(payload: { dataIndex: string; selectedRows: string[] }) {
    this.orderList.forEach(item => {
      item[payload.dataIndex as keyof IOrder] = payload.selectedRows.includes(
        item.orderId
      );
    });
  }

  @Action({ rawError: true })
  public initialiseOrder() {
    const currentTime = moment().format("YYYY-MM-DD");
    const randomItem: string[] = ["Green Package", "Yellow Package"];
    const randomStatus: Status[] = ["wait", "print", "out", "received"];
    const randomBatch: string[] = [
      "ยังไม่ได้มอบหมาย",
      `${currentTime}-01`,
      `${currentTime}-02`
    ];
    const randomBoolean: boolean[] = [true, false];
    const temp: IOrder[] = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        orderId: `${i + 1}`,
        cid: formatPhoneNumber(),
        patientName: `First ${i} Last ${i}`,
        phoneNumber: "081-111-1111",
        orderedItem: randomItem[Math.floor(Math.random() * randomItem.length)],
        orderedDate: moment(randomDate()).format(),
        exportBatch:
          randomBatch[Math.floor(Math.random() * randomBatch.length)],
        trackingNo: `KT${i}${moment(randomDate()).format("x")}`,
        warehouse: "EDP",
        orderedBy: "Dr. Some Body",
        updatedBy: "Update User",
        updatedDate: moment(randomDate()).format(),
        address: "130/8 Moo 11 Suksawad Road Kru Nai, 10130 Phra Pradaeng",
        province: "กรุงเทพมหานคร",
        district: "บางรัก",
        subDistrict: "สี่พระยา",
        zipCode: "10130",
        remark: "Blue House",
        deliveryStatus:
          randomBoolean[Math.floor(Math.random() * randomBoolean.length)],
        printStatus:
          randomBoolean[Math.floor(Math.random() * randomBoolean.length)],
        status: randomStatus[Math.floor(Math.random() * randomStatus.length)]
      });
    }
    if (this.orderList.length < 1) this.SET_ORDER_LIST(temp);
  }

  @Action({ rawError: true })
  public getOrderDetail(orderId: string) {
    return Promise.resolve(
      this.orderList.find(order => order.orderId === orderId)
    );
  }

  @Action({ rawError: true })
  public updateOrder(payload: IOrder) {
    this.UPDATE_ORDER(payload);
  }

  @Action({ rawError: true })
  public updateExportBatch(payload: {
    batchNo: string;
    selectedRows: string[];
  }) {
    this.SET_BATCH_NUM(payload);
  }

  @Action({ rawError: true })
  public setPrintStatus(selectedRows: string[]) {
    this.SET_STATUS({ dataIndex: "printStatus", selectedRows });
  }

  @Action({ rawError: true })
  public updateDeliveryStatus(selectedRows: string[]) {
    this.SET_STATUS({
      dataIndex: "deliveryStatus",
      selectedRows
    });
  }
}
