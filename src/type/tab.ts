export type MobileTabDict = {
    [key: string] : {
        imageSrc: string;
        hoverImageSrc: string;
    }
}

export interface DesktopTabType {
    top: number;
    right: number;
    zIndex?: number;
}       

type DesktopTabDict = {
    [key: string]: DesktopTabType;
}

export default DesktopTabDict;
