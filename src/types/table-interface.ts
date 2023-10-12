export interface ObjTableData {
    id?: number;
    nama: string;
    foto: File | null;
    harga: string
    jumlah: number
}

export interface TableData {
    data: ObjTableData[]
    showAdd?: boolean
}
