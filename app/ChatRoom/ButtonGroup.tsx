import styled from '@emotion/styled';
import {Button} from '@/ui/button';
import {resetConversation} from './conversation';
import {main} from './main';

const Container = styled.div`
    margin-left: 120px;
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`;

export const ButtonGroup = () => {
    return (
        <Container>
            <Button onClick={main}>开始</Button>
            <Button onClick={resetConversation}>清除</Button>
        </Container>
    );
};
