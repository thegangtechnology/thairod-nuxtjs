import {Address} from "~/models/Address";

export interface Order{
  id: number
  status: string
  receiverName: string
  receiverAddress: Address
  receiverTel: string
  cid: string
  orderBy: string
  orderTime: string
}
