import type { Metadata } from "next";
import Link from "next/link";
import RainbowButton from "@/components/RainbowButton";
import { submitContact } from "@/app/actions";
import { readMessages } from "@/lib/messages";

export const instant = false;

export const metadata: Metadata = {
  title: "AJ's Home Page",
};

export default async function Home() {
  const messages = await readMessages();
  return (
    <>
      <center>
        <h1>Welcome to AJ&apos;s Home Page!</h1>
      </center>
      <hr />
      <p>
        <img src="/under_construction.gif" alt="[UNDER CONSTRUCTION]" style={{ verticalAlign: "middle" }} /> This page is <b>UNDER CONSTRUCTION</b>. Please pardon my dust!
      </p>
      <div className="text-center">

        <RainbowButton>Click Me</RainbowButton>
	<RainbowButton> <RainbowButton> Crazy Use Case   </RainbowButton> </RainbowButton>
      </div>
      <hr />
      <h2>What&apos;s New</h2>
      <ul>
        <li><b>11/03/96</b> -- Added some new <Link href="/links">cool links</Link>!</li>
        <li><b>10/21/96</b> -- Signed up for <a href="http://www.netscape.com/">Netscape</a>!</li>
        <li><b>09/15/96</b> -- Page created. Wow!</li>
      </ul>
      <hr />
      <h2>About Me</h2>
      <p>
        Hello! My name is AJ. Welcome to my little corner of the Internet. I made this page to learn about the <a href="http://www.w3.org/">World Wide Web</a>.
      </p>
      <p>Here are some of my interests:</p>
      <ul>
        <li>Computers (obviously!)</li>
        <li>Bulletin Board Systems (BBS)</li>
        <li>Hacker movies (watched <i>WarGames</i> 14 times)</li>
        <li>Reading <cite>2600 Magazine</cite></li>
      </ul>
      <p>
        Want to know more? Check out my <Link href="/about">About Me</Link> page.
      </p>
      <hr />
      <h2>Cool Stuff On My Page</h2>
      <ul>
        <li><Link href="/about">All About Me</Link></li>
        <li><Link href="/links">My Cool Links</Link></li>
        <li><Link href="/guestbook">Sign My Guestbook!</Link></li>
      </ul>
      <hr />
      <h2>Contact Me</h2>
      <p>
        Got something to say? Fill out this form and it will be saved right on my server!
      </p>
      <form action={submitContact}>
        <p>
          Your Name:
          <br />
          <input type="text" name="name" size={40} required />
        </p>
        <p>
          Message:
          <br />
          <textarea name="message" rows={5} cols={50} required />
        </p>
        <p>
          <RainbowButton type="submit">Send Message</RainbowButton>
        </p>
      </form>
      <h2>Messages So Far ({messages.length})</h2>
      {messages.length === 0 ? (
        <p>
          <i>No messages yet. Be the first to say hi!</i>
        </p>
      ) : (
        messages.map((m, i) => (
          <p key={i}>
            <b>From:</b> {m.name}
            <br />
            <b>Message:</b> {m.message}
          </p>
        ))
      )}
      <hr />
      <p>You are visitor number:</p>
      <pre>{`    _____          _____
   /     \\  0000  /     \\
  |  H I T  |||||  C O U N T E R  |
   \\_____/  0000  \\_____/
        [ C O N T E R  D O W N ]`}</pre>
      <p>
        <b>NOTE:</b> This page is best viewed with <a href="http://www.netscape.com/">Netscape Navigator 1.1</a> at 640x480 resolution with 256 colors.
      </p>
      <p><i>Last updated: November 3, 1996</i></p>
      <p><a href="mailto:aj@nowhere.example">Send me e-mail!</a></p>
      <hr />
      <center>
        <small>&copy; 1996 AJ. All rights reserved.</small>
      </center>
    </>
  );
}
