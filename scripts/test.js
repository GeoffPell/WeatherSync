(async () => {
    let defeated = canvas.tokens.placeables.filter(t => {
        /* only keep tokens with Hostile disposition and HP <=0 a.k.a dead */
        return t.data.disposition === -1 && t.data.actorData.data?.attributes?.hp?.value <= 0
    });

    //Change Frog to the name of whatever token you want to use
    for (let token of defeated) {
            let invalid = await token.getFlag(`world`,`Frog`) ? await token.getFlag(`world`,`Frog`) : false;
            if (invalid)
                continue;
    
            /* ignore non-npc tokens or tokens not named commoner */
            if (token.actor.data.type != 'npc')
                continue;
    
            if (token.data.name != 'Frog')
                continue;
                
            //This is where stuff happens. This setup below turns the frog into a trap.  
            let tactor = game.actors.entities.find(a => a.name === "TrapEffects")
            let item = tactor.items.find(i=>  i.name === "Fireball")
            new MidiQOL.TrapWorkflow(tactor, item, [token], token.center)
            //This changes the name of the token after the trap is activated. 
            { token.update({name: "Burnt Remains"}) }
            //This changes the image. 
            {token.update({img: "/img/filepath/goeshere"}) }
            //This plays a sound effect.
                FurnacePlaylistQoL.PlaySound("Playlist", "Track Name")  
            //This creates a chat message.
            ChatMessage.create({ 
            content : `Burp`,
            speaker : ChatMessage.getSpeaker({ token : token }),
            },{
            chatBubble : true,
            });
    
    
    }
    
    await token.setFlag(`world`,`Frog`,true);
    
})();
