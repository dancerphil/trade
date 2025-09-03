import {PanelGroup, Panel, PanelResizeHandle, PanelProps} from 'react-resizable-panels';
import {css} from '@emotion/css';
import {ReactNode} from 'react';
import {token} from '@/constants/token';

const handleCss = css`
    position: relative;
    width: 1px;

    .devops-resize-handle-line {
        position: absolute;
        width: 1px;
        height: 100%;
        background-color: ${token.colorBorder};
    }

    &[data-resize-handle-state="hover"],
    &[data-resize-handle-state="drag"] {
        .devops-resize-handle-line {
            width: 3px;
            left: -1px;
            background-color: ${token.colorPrimaryBgHover};
        }
    }
`;

interface Props {
    autoSaveId?: string;
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    leftProps?: PanelProps;
    centerProps?: PanelProps;
    rightProps?: PanelProps;
}

export const ResizeLayout = ({
    autoSaveId,
    left,
    center,
    right,
    leftProps,
    centerProps,
    rightProps,
}: Props) => {
    return (
        <PanelGroup direction="horizontal" autoSaveId={autoSaveId}>
            {left && <Panel order={1} {...leftProps}>{left}</Panel>}
            {left && center && (
                <PanelResizeHandle className={handleCss}>
                    <div className="devops-resize-handle-line" />
                </PanelResizeHandle>
            )}
            {center && <Panel order={2} {...centerProps}>{center}</Panel>}
            {(left || center) && right && (
                <PanelResizeHandle className={handleCss}>
                    <div className="devops-resize-handle-line" />
                </PanelResizeHandle>
            )}
            {right && <Panel order={3} {...rightProps}>{right}</Panel>}
        </PanelGroup>
    );
};
