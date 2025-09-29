import styled from '@emotion/styled';
import {flex1, width} from '@hero-u/css';
import {css} from '@emotion/css';
import {useMessage} from './conversation';
import {Markdown} from './components/Markdown';
import {IconMessage} from './icons';

const Container = styled.div`
    display: flex;
    padding: 8px 15px;
`;

const agentMessageCss = css`
    background-color: aliceblue;
    
    .markdown-body {
        background-color: aliceblue;
    }
`;

const iconMessageCss = css`
    margin-left: 4px;
    animation: pulse 1s ease-in-out infinite alternate;

    @keyframes pulse {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

interface Props {
    round: number;
}

export const Message = ({round}: Props) => {
    const {loading, role, content} = useMessage(round);
    return (
        <Container className={role === '主持人' ? undefined : agentMessageCss}>
            <div className={width(120)}>
                {role}
                {loading && <IconMessage className={iconMessageCss} />}
            </div>
            <div className={flex1}><Markdown>{content}</Markdown></div>
        </Container>
    );
};
