import { saveAs } from 'file-saver/dist/fileSaver';

export class AppUtils {
    public static getOffSet(registers:number, page:number):number{
        return (page-1) * registers;
    }

    public static getTotalPagesByTable(totalRegisters:number, register:number):number{
        let total:number = totalRegisters/register;
        total = Number(total.toFixed(0));
        return total + 1;
    }

    public static saveFile(blobContent: any, fileName: string){
        const blob = new Blob([blobContent],{ type: 'application/octet-stream' });
        saveAs(blob, fileName);
    }
}