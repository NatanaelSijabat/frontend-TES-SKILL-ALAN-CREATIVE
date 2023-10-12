export interface ObjTableData {
    id?: number;
    nama: string;
    foto: File | null;
    harga: string
}

export interface TableData {
    data: ObjTableData[]
}