import {useMemo} from 'react';
import styled from '@emotion/styled';
import {useRound} from './conversation';
import {Message} from './Message';
import {ButtonGroup} from './ButtonGroup';

const Container = styled.div`
    padding: 40px 20px;
`;

export const Trade = () => {
    const round = useRound();
    const rounds = useMemo(
        () => {
            const arr = [];
            for (let i = 0; i <= round; i++) {
                arr.push(i);
            }
            return arr;
        },
        [round],
    );
    return (
        <Container>
            <ButtonGroup />
            {rounds.map(r => <Message key={r} round={r} />)}
        </Container>
    );
};
