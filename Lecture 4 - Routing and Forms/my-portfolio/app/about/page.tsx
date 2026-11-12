import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me",
};

export default function About() {
  return (
    <>
      <center>
        <h1>All About AJ</h1>
      </center>
      <hr />
      <p>
        [<Link href="/">Back to Home Page</Link>]
      </p>
      <hr />
      <h2>My Life Story (the short version)</h2>
      <p>
        I first touched a computer in 1984 and I have never been the same since. I started out on a <b>Commodore 64</b>, graduated to a <b>386</b> with a <i>turbo button</i>, and now I surf the Information Superhighway at a blistering 28.8 kbps.
      </p>
      <blockquote>
        <p>
          &quot;The Internet? We are not interested in it.&quot; -- attributed to a real person, allegedly
        </p>
      </blockquote>
      <h2>My Computer Setup</h2>
      <ul>
        <li>486DX2 66 MHz (with turbo!)</li>
        <li>8 MB RAM (I know, I know)</li>
        <li>28.8 kbps modem</li>
        <li>540 MB hard drive (huge!)</li>
        <li>Sound Blaster 16</li>
        <li>14&quot; monitor with 256 colors</li>
      </ul>
      <h2>My Favorite Things</h2>
      <table border={1} cellSpacing={1} cellPadding={4}>
        <tbody>
          <tr>
            <th>Thing</th>
            <th>Rating</th>
          </tr>
          <tr>
            <td>The movie <i>Hackers</i></td>
            <td>10/10</td>
          </tr>
          <tr>
            <td>Dial-up modem sounds</td>
            <td>10/10</td>
          </tr>
          <tr>
            <td>Waiting for images to load</td>
            <td>2/10</td>
          </tr>
          <tr>
            <td>Getting mail from Gopher</td>
            <td>8/10</td>
          </tr>
        </tbody>
      </table>
      <h2>How To Reach Me</h2>
      <ul>
        <li>
          E-mail: <a href="mailto:aj@nowhere.example">aj@nowhere.example</a>
        </li>
        <li>
          IRC: <b>/join #newbies</b> (look for AJ)
        </li>
        <li>
          BBS: &quot;The Grid&quot; -- Fri/Sat nights only
        </li>
      </ul>
      <hr />
      <center>
        <Link href="/">Home</Link> | <Link href="/links">Links</Link> | <Link href="/guestbook">Guestbook</Link>
      </center>
      <p><i>Last updated: November 3, 1996</i></p>
    </>
  );
}
