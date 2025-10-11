import {Streamdown} from 'streamdown';

interface Props {
    children: string;
}

export const Markdown = ({children}: Props) => {
    return (
        <Streamdown
            // className="size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        >
            {children}
        </Streamdown>
    );
};
