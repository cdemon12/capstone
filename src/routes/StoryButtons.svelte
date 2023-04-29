<div class="buttons-container">
    <ul class="buttons">
      <li><a href="#data"><img src="https://picsum.photos/id/687/500/300" alt="Database"><h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus.</h3></a></li>
      <li><a href="#fbi"><img src="https://picsum.photos/id/580/500/300" alt="FBI story"><h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus.</h3></a></li>
      <li><a href="#think"><img src="https://picsum.photos/id/156/500/300" alt="Think piece"><h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus.</h3></a></li>
      </ul>
  </div>

<style lang="sass">
    $primary-color: #fbb812
    $detour-body-font: 'Rubik', Segoe UI

    .buttons
        list-style: none
        padding: 20px 0 0px 0 
        margin: 0
        display: flex
        gap: 20px
        li
            justify-items: center
            margin: 0
            a
                text-decoration: none
                color: black
                font-weight: bold
                font-family: $detour-body-font
                &:hover
                    color: $primary-color
                h3
                    margin-bottom: 0
                img
                    border-radius: 5%
                    transition: transform 0.2s ease-in-out
                    max-width: 100%
                    max-height: 100%
                    &:hover 
                        transform: scale(1.1)
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.5)
    .buttons-container
        max-width: 100%
        position: relative
        margin: 0
        justify-items: center
</style>
