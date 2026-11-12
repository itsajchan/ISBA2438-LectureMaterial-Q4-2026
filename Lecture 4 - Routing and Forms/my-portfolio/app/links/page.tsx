import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AJ's Cool Links",
};

export default function Links() {
  return (
    <>
      <center>
        <h1>AJ&apos;s Cool Links</h1>
      </center>
      <hr />
      <p>
        [<Link href="/">Back to Home Page</Link>]
      </p>
      <hr />
      <p>
        Here are my favorite places on the World Wide Web. If you have a cool page, e-mail me and I might add it!
      </p>
      <h2>Search Engines &amp; Directories</h2>
      <ul>
        <li><a href="http://www.yahoo.com/">Yahoo!</a> -- If it isn&apos;t here, it isn&apos;t anywhere.</li>
        <li><a href="http://www.altavista.digital.com/">AltaVista</a> -- Search millions of pages!</li>
        <li><a href="http://www.lycos.com/">Lycos</a> -- The Catalog of the Internet.</li>
        <li><a href="http://www.webcrawler.com/">WebCrawler</a> -- Fast and simple.</li>
      </ul>
      <h2>Web Stuff</h2>
      <ul>
        <li><a href="http://www.w3.org/">The World Wide Web Consortium</a> -- The folks who make the rules.</li>
        <li><a href="http://www.netscape.com/">Netscape</a> -- Download Navigator 1.1!</li>
        <li><a href="http://www.htmlgoodies.com/">HTML Goodies</a> -- Learn to make YOUR OWN home page!</li>
        <li><a href="http://www.ncsa.uiuc.edu/">NCSA</a> -- Home of Mosaic, the first web browser.</li>
      </ul>
      <h2>Fun &amp; Games</h2>
      <ul>
        <li><a href="http://www.spacejam.com/">Space Jam</a> -- The movie web site everyone is talking about.</li>
        <li><a href="http://www.hampsterdance.com/">The Hampster Dance</a> -- You have to see it to believe it.</li>
      </ul>
      <h2>Friends&apos; Home Pages</h2>
      <ul>
        <li><b>Jim&apos;s Star Trek Page</b> -- (link broken, Jim if you read this fix your server!)</li>
        <li><b>The Grid BBS</b> -- telnet only, no web page yet, get with the times guys</li>
      </ul>
      <hr />
      <center>
        <Link href="/">Home</Link> | <Link href="/about">About Me</Link> | <Link href="/guestbook">Guestbook</Link>
      </center>
      <p><i>Last updated: November 3, 1996</i></p>
    </>
  );
}
