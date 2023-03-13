<div class="buttons-container">
    <ul class="buttons">
      <li><a href="#data"><img src="https://picsum.photos/id/687/500/300" alt="Database"></a></li>
      <li><a href="#fbi"><img src="https://picsum.photos/id/580/500/300" alt="FBI story"></a></li>
      <li><a href="#think"><img src="https://picsum.photos/id/156/500/300" alt="Think piece"></a></li>
      </ul>
  </div>

<style lang="sass">
    .buttons
        list-style: none
        padding: 20px 
        margin: 0
        display: grid
        grid-template-columns: repeat(3, 1fr)
        li
            justify-items: center
            margin: 0 20px 0 20px
            img
                border-radius: 5%
                transition: transform 0.2s ease-in-out
                max-width: 100%
                max-height: 100%
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.5)
                &:hover 
                    transform: scale(1.1)
    .buttons-container
        max-width: 100%
        position: relative
        margin: 0
        justify-items: center
</style>
