import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AJ's Guestbook",
};

export default function Guestbook() {
  return (
    <>
      <center>
        <h1>AJ&apos;s Guestbook</h1>
      </center>
      <hr />
      <p>
        [<Link href="/">Back to Home Page</Link>]
      </p>
      <hr />
      <p>
        Thanks for visiting my page! Please take a moment and sign my guestbook. Don&apos;t forget to tell me where you are calling from!
      </p>
      <h2>Sign My Guestbook</h2>
      <form action="mailto:aj@nowhere.example" method="post" encType="text/plain">
        <p>
          Your Name:
          <br />
          <input type="text" name="name" size={40} />
        </p>
        <p>
          E-Mail Address:
          <br />
          <input type="text" name="email" size={40} />
        </p>
        <p>
          Your Home Page URL (if you have one):
          <br />
          <input type="text" name="url" size={40} defaultValue="http://" />
        </p>
        <p>
          Comments:
          <br />
          <textarea name="comments" rows={5} cols={50} />
        </p>
        <p>
          <input type="submit" value="Sign Guestbook" />
          <input type="reset" value="Start Over" />
        </p>
      </form>
      <hr />
      <h2>Recent Signatures</h2>
      <p>
        <b>Name:</b> SurfDude99
        <br />
        <b>From:</b> California, USA
        <br />
        <b>Comments:</b> Radical page AJ!!! Check out my page sometime. Keep on surfin&apos;!!!
      </p>
      <hr />
      <p>
        <b>Name:</b> SysOp of The Grid BBS
        <br />
        <b>From:</b> Right here, dummy
        <br />
        <b>Comments:</b> Don&apos;t forget: the BBS goes down for maintenance this Friday. See you on the boards.
      </p>
      <hr />
      <p>
        <b>Name:</b> Anonymous Coward
        <br />
        <b>From:</b> 127.0.0.1
        <br />
        <b>Comments:</b> First!
      </p>
      <hr />
      <center>
        <Link href="/">Home</Link> | <Link href="/about">About Me</Link> | <Link href="/links">Links</Link>
      </center>
      <p><i>Last updated: November 3, 1996</i></p>
    </>
  );
}
