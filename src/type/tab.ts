export interface TabType {
    top: number;
    right: number;
    zIndex?: number;
}       

type TabDict = {
    [key: string]: TabType;
}

export default TabDict;
