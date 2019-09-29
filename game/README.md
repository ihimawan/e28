# Live play
http://hoatheboa.indrihimawan.com/

# Hoa (ho-a) The Boa
Despite being a species of large, heave-bodied snake, <b>Hoa the Boa</b> is a reptile whose been single for 24 years. He just never felt ready to talk to a lady Boa. However, after months and months of contemplating, he decided that <b>TONIGHT IS THE NIGHT</b> he's going to get the a lady boa that he's going to take home so his mom would finally be proud of him after all these years (he still lives with his mom). With this determination, so he went to the biggest reptile bar in town...

## weird stuff & problems solved
1. Strange behavior in javascript setInterval when you have another setInterval within it that uses a variable that changes from the outter setInterval.
    * haven't figured out what the problem is though. But the solution I had was to put this variable globally. 
1. There is no comparison available for javascirpt objects
    *  so need to do JSON.stringify(), as long as the keys are not rearranged
1. when user makes input of multiple direction changes before a turn has been made 
    * solved by using a queue. So the direction changes are stored in the queue and makes sure that each direction input makes the snake move appropriately. 
1. I don't want people to find out what happens when you win
    * I did some minor obfuscation

## more stuff can be done
1. power ups
1. multiple enemies
1. more robust obfuscation to hide what happens when you win
1. responsive UI