import type { IWatermarkPanelProps } from 'dockview';

const Watermark = (_props: IWatermarkPanelProps) => {
    return (
        <div className="watermark">
            <div className="letterpress"/>
            <div className="shortcuts"></div>
        </div>
    );
}

export default Watermark;
