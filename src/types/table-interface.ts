export interface ObjTableData {
    id?: number;
    nama: string;
    foto: File | null;
    harga: string
}

export interface TableData {
    data: ObjTableData[]
}

export interface ObjTransaksi {
    nama: string
    foto: string
    harga: string
    jumlah: number 
}