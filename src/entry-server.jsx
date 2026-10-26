import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { PAGES, headTags } from './seo.js';
export const render = (url) => renderToString(<App url={url} />);
