import React from 'react';

/*eslint @typescript-eslint/no-explicit-any:off */
type Props = {
  children: any;
  css: string[];
  scripts: string[];
  state: string;
};

const Html = ({ children, scripts = [], css = [], state = '{}' }: Props) => (
  <html lang="">
    <head>
      <title>Universal App</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {css.filter(Boolean).map(href => (
        <link rel="stylesheet" href={href} key={href} />
      ))}
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__=${state}`,
        }}
      />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      {scripts.filter(Boolean).map(src => (
        <script src={src} key={src} />
      ))}
    </body>
  </html>
);

export default Html;
