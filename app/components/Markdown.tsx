import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown-light.css';

const remarkPlugins = [remarkGfm];

interface Props {
    children: string;
}

export const Markdown = ({children}: Props) => {
    return (
        <div className="markdown-body">
            <ReactMarkdown remarkPlugins={remarkPlugins}>
                {children}
            </ReactMarkdown>
        </div>
    );
};
