import { saveAs } from 'file-saver/dist/fileSaver';
import { Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

export class AppUtils {
    public static getOffSet(registers:number, page:number):number{
        return (page-1) * registers;
    }

    public static getTotalPagesByTable(totalRegisters:number, register:number):number{
        let total:number = totalRegisters/register;
        total = Number(total.toFixed(0));
        return total;
    }

    public static saveFile(blobContent: Blob, fileName: string){
        saveAs(blobContent, fileName);
    }

    public static getFileNameFromResponseContentDisposition (headers: HttpHeaders):string{
        const contentDisposition = headers.get('content-disposition') || '';
        const matches = /filename=([^;]+)/ig.exec(contentDisposition);
        const fileName = (matches[1] || 'untitled').trim();
        return fileName;
    }
}