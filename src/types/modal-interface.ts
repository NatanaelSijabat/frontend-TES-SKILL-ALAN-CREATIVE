import { ObjTableData } from "./table-interface"

export interface ModalProps {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    data: ObjTableData[] 
}