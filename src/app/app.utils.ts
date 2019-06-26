import { saveAs } from 'file-saver/dist/fileSaver';
import {md5}from 'md5';
import { Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {AppConstants} from './app.constants';

export class AppUtils {
    public static getOffSet(registers:number, page:number):number{
        return (page-1) * registers;
    }

    public static getPasswordCrypt(password:string):string{
        return password;
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

    public static getColorName(joint:number):string{
        switch(joint){
            case 0: { return "#8B0000"}
            case 1: { return "#FF0000"}
            case 2: { return "#FFA07A"}
            case 3: { return "#C71585"}
            case 4: { return "#FF1493"}
            case 5: { return "#FFC0CB"}
            case 6: { return "#FF8C00"}
            case 7: { return "#FF6347"}
            case 8: { return "#AAA07A"}
            case 9: { return "#FFFF00"}
            case 10: { return "#FFD700"}
            case 11: { return "#BDB76B"}
            case 12: { return "#EEE8AA"}
            case 13: { return "#8A2BE2"}
            case 14: { return "#483D8B"}
            case 15: { return "#E6E6FA"}
            case 16: { return "#EE82EE"}
            case 17: { return "#00FA9A"}
            case 18: { return "#66CDAA"}
            case 19: { return "#9ACD32"}
            default: {return "#191970"}
        }
    }
}