# Brick Breaker
Built a brick breaker game. Brick Breaker was one of the games that I loved to play when I was a kid.
I think it was called Block Breaker at the time.

**Controls:**
You can use the left or right arrow keys to move the paddle, or you can use the mouse.

**Technologies:**
Used the <canvas> tag, which creates a canvas where you can draw 2d objects.
To draw you need to create two variable which. 
1. A variable to get the element from the HTML which would be the canvas
2. A variable to connect the first variable with the getContext() method.
getContext returns a drawing on the canvas.

From there you can start drawing shapes.

At first I used setInterval() to reload the canvas every 10 milliseconds. 
But then switched to .requestAnimationFrame() which updates the animation through your browser.

**Bugs:** 
Came across a few bugs, while building and adding to the code. 
1. At one point I was able to make the brick disappear when colliding with the ball,
    the brick would disappear but still be there but invisible.
2. When trying to add a background, it would overlay over the rest of the canvas, 
    so you couldn't see the anything but the background. 
3. When trying to move the paddle off the bottom of the canvas, the ball would go through the paddle
4. When a life was lost and it reset, the ball would reset under the paddle causing all lives to be lost immediately.
5. Sometimes winning sound doesn't play, or the lose sound
6. Ball sometimes when hitting bottom doesn't reset. Bounces between the paddles and floor.

**Things I wanted to add:**
1. The ball moves in the same trajectory when hitting the paddle. The ball doesn't redirect left when
    hitting the left side of the paddle. And does not redirect right when hitting the right side. 
2. Wanted to add a starting screen, with a play but to start the game. 
3. Wanted to add an onclick function when starting and after each life so the game doesn't start right away. 
4. Wanted to add some music.
5. Wanted to add more levels, with harder bricks. 
6. Wanted to add power ups. MULTIBALL!!!!!(sad face).

