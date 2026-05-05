Right now, the performance of the website sucks because i have locally implemented frontend effects. instead, i want to use react bits.

If this doesn't work, we'll just restore this version from git.


First, lets drop the title swipe effect and the ascii art.

Lets just write "I'm Mack" large on the page, using the "ASCII TEXT" effect from react bits. 

// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE
  
import ASCIIText from './ASCIIText';

<ASCIIText
  text="Hey!"
  enableWaves
  asciiFontSize={8}
/>

I can also drop the actual code in if you need- but assumung you can find it your self... https://www.reactbits.dev/text-animations/ascii-text

.

right now, all of the text is rendered dynamically in js to create a mouse hover effect. this is super expensive. first, make it normal again and ill confirm. after that, use the "scrambled text" effect from react bits, and change the radius to hex. 

// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import ScrambledText from './ScrambledText';
  
<ScrambledText
  className="scrambled-text-demo"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:"
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Similique pariatur dignissimos porro eius quam doloremque 
  et enim velit nobis maxime.
</ScrambledText>


https://www.reactbits.dev/text-animations/scrambled-text
