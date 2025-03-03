import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Lato&family=Zilla+Slab:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <link rel="icon" type="image/x-icon" href="/logo.png" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
