<template>
  <div class="tabbar">
    <div class="tabbar-border"></div>
    <div class="tabbar-list">
      <div
        class="tabbar-item"
        v-for="item of data.tabbarList"
        :key="item.idx"
        :data-page-path="item.pagePath"
        :style="item.idx == activeIdx ? 'color:' + item.selectedColor : ''"
        @click="updateActiveIdx(item)"
      >
        <div class="tabbar-item-icon">
          <img
            :src="item.idx == activeIdx ? item.selectedIconPath : item.iconPath"
            alt=""
          />
        </div>
        <div
          class="tabbar-item-text"
          :class="item.idx == activeIdx ? 'active' : ''"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, inject, onMounted } from "vue";
export default {
  name: "Tabbar",
  setup() {

    const data = reactive({
      activeIdx: 0,
      tabbarList: [
        {
          idx: 0,
          pagePath: "/news",
          text: "资讯",
          iconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAACuklEQVRYhc1YsW4TQRB9sa5EilMlDYo7SvsDOPn4Aui2tGmo/QcmX0AK+jhdtjMFEuWZ+wG7pAqIJlQkXTqjsd6a8XjPdzJnhSdZcfZ2Zt7OzM7M+Wi5XKIOvC/aAN7w0wNwHpH7AWAOYCof59L7OrorSXhfdAC8BzCoxXYT1yLrXPp916ZWBQExfrsnAVDulnpKEfUETy8u7UYEf8oWAJ/F9eJyhkpC9A7ASwDPI3ILCWXMK1skvC9EWQ7gWC0/8G9Ye+VcmkfIy4nH/PcbgLOInsy5dK7lWkZJJ0JgxlPqtTq4o9xM7RUdOe3ESTAE2ti1c2lWlVhlEDmRZ4JqItMoCbpS54AQGO5j3IJ6NJGuTtYW/oZhrDbNmiIQQH06NOMQluAJfYUkeRoloDBUSb62e3Rz81Wu12/14MK5dPXQ+2IEoB2Yqz3i2lieSPz7/C7Vc1KxR3CSsAxrXJLAZEeRqlO8zg1xjV/8fir2LYlPqt73ahjaF6dK7j4xxnQByujOEA7tQql+sebUUY3tgc2sDM8AfHQunSamG66F6JG1l7wvdGkd1aiYc9aISthitYv5wZBoxXX7fxNg05NLMLK9o30wq9t2ct6y3IbjkDfC2gktoivFSopOSM6yrAczP0A65GNkT1vdpkfuA3UOQ7hZBD8EoYTJGEjEhpgYYvNlDC/UmrTwjEQ2bk3LttVDg/nwWptJSOJKrS1KiOmm9kW5WqOn8uqO+wIuOQpuzZur8c70Cal0PTvImGJVZ7yb2WLF1j23U1qslR+XdL8mMImNiSsSPPWFWu/TO42B+voxfes6wRlioZ4NmiISGQv0YLNZttmwdMwGjONekxZlrQeEwEhfho2KybBkhmmfxDbY18AZ5SyBzDbKJ3sD874Y0htvd74Qmyv3L1jPrfawQuq/eCt/+t8nAPwBkugxdfc0nCwAAAAASUVORK5CYII=",
          selectedIconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAACwElEQVRYhc1YsW7bQAx9MTQWiDMlSxFvHe0PEGD1C9o/sLtEqCb/gZsvaIZAgKY6Yzd3KNBRRvUB9tgpLbqkU5Mtmwsa71yaPlmCKyN9gBHndCTfkTyS8tFyuUQdJHHRBvCanx6Ac4/cDwBzAFP5pFl4X0d3JYkkLjoA3gEY1GK7iRuRTbPw+65NrQoCYvx2TwKg3C31lMLrCZ5eXNr1CP4E8BHAZ3G9uJyhkhBdAAgBPPfILSSUPq9skUjiQpTlAI7V8gP/urWXaRbmHvJy4jH//QbgzKMnSrNwruVaRknHQ2DGU+q1Orij3EztFR057fhJMATa2E2ahVFVYpVB5ESeCaqJTL0k6EqdA0JguI9xC+rRRLo6WVv4G4ax2jRrioAD9enQjF1YnCf0FZLkaZSAwlAl+dru0duLr3K9fqsHl2kWrh4mcTEC0HbM1R5xrS9PJP59fpfqOanYIzgJWIY1rkhgsqNI1Sle54a4xi9+PxX7lsQnVe97NQzti1Mldx8YY7oARXSnC4d2oVQ/X3PqqMb2wGZWhmcArtMsnAamG66F6JG1l5K40KV1VKNizlkjKmGL1S7mB0OgFdft/02ATU8uwcj2jvbBrG7byXnLchuOQ94Ia8e1iK4UKyk6LjnLsh7MfAfpkI+ePW11mx65D9Q5dOFmEXzvhAImoyPhG2J88M2XPrxQa9LCIxLZuDUt21YPDebDK20mIIkPam1RQkw3tS/K1Ro9lVd33OdwxVFwa95cjXemT0il69lBxhSrOuPdzBYrtu65ndJ8rfy4pPs1gYlvTFyR4Kkv1Xqf3mkM1Nf36VvXCc4QC/Vs0BQRz1igB5vNss2GpWM2YBz3mrQoaz0gBEb6MmxUTIYlMkz7JLbBvgbOKGcJRLZRPtkbWBIXQ3rjzc4XYnPl/gXrudUeVkj9F2/lT//7BIA/wQ8tdZ5DM9YAAAAASUVORK5CYII=",
          selectedColor: "#7977b2",
        },
        {
          idx: 1,
          pagePath: "/media",
          text: "视听",
          iconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAACiUlEQVRYhb1YO44TQRB9OyIgQQsnsJGIWV9gtD6Csw4xJwAiyICMDHGC9WbbAZI5AV7mAIyB3PYJWIsAMqOy3ljl2p6enjHmSROsZ6rqdf17TzabDVLgfXEfwIjPAEAvILcCUAKYyuNcfpOiu5GE90UfwBsAT5LY7uNSZJ3Ll7GPsgYCYnzRkQAot6CeWgQ9wdOLS88CguLyGd1eqt8HfIY1oZpLKENeuUXC+2JAI6fm22u6dtZ0fO+LIUN4bl6thaRzuSa/T4IeKA0BERw7l0+bjAfISBJPAvoG2iM2J6ZGQFzY70JAQLk+9VQ4pZ0ddiSYPDoH5nRdUplFiNwwTzSRM52s23AwDAv10ZoeOIiABvvM0nj6oYSl8oQtoXGMgCSvnIQJmATqG5tvt3ZPrq6+CMOf6sW1c3lUOV35mn9+cC5/nkrG+2JmquZBxjZ8i10LPBPFdHcKrP6RJbFK6QMByMmW7DFRUP/KktCCXQhUkIT76n1h4x6CtjPITIstm+UbceF9MWkIj7bTs83qX5AAB9ckkUR8ih6I1EQ9KolkWBKN2Z2IeaD0a+3cYbn0Qi87IqV5aTurzCRJchsOQObN08Tuqe2UmRmrvTbzQKGauLGK2IL6dVuYWhK/ALxvSeBTaFuKwLbtacbp9hHAbwD3JF4c7TGU3KRfOJePUkc+Ny09vC5FttonHqulQ16ktN5WaNwnnMu/yQ882bEI2OX5bbVnRi8/TKLykA1LEdhbHZ3Ld2Va2zFlCAH4DOAHY9mFwIgh0ATWtpHVXX6GJCD4A+Duf7t3GEXfATwiAY3j38AMkXcAXsZOnQhJwtq1MTpFnctfsWqkJ3SByEkZtr8Qh3C0/08A+AsuwivoDhMONQAAAABJRU5ErkJggg==",
          selectedIconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAACjUlEQVRYhb1YTW7TUBD+arFAllDhBAkSa+obkBNY2WOJcAJgBTtg113FCUglb5FSX4D0BDjAPskJaIQw7IIm+hxNps/PLw7hk7xo7Jn53vy/nqzXa4SgKrL7AIZ8EgA9h9wSQAlgIk+c5jchultJVEXWB/AOwLMgtru4FNk4zRe+j6IWAmJ83pEAKDennkY4PcHTi0vPHILi8indXqrfEz6DhlDNJJQur9wiURVZQiOn5ttrunbadvyqyAYM4RPzaiUk4zTX5HdJ0AOlISCCozjNJ23GHWQkiccOfYn2iM2JiREQF/a7EBBQrk89NU5pZ4stCSaPzoEZXRdUZh4iN8wTTeRMJ+smHAzDXH20ogcOIqDBPrMwnn4oYak9YUto5CMgySsnYQIGgfpG5tuN3ZNfV0+F4Q/14jpOc69yuvIt//wQp/nLUDJVkU1N1TyI2IZvsdsDL0Qx3R0Cq39oSSxD+oADcrIFe4wX1L+0JLRgFwI1JOG+VEVm4+6CtpNEpsWW7fKt+FgV2bglPNpOzzarf0ECHFzjQBL+KXogQhP1qCSCYUm0ZncgZo7Sb7Rzh+XSc73siJDmpe0sI5MkwW3YAZk3zwO7p7ZTRmas9vaZBwr1xPVVxAbUr9vCxJL4CeBiTwJXrm3JA9u2JxGn2ycAvwHck3hxtPtQcpN+Faf5MHTkc9PSw+tSZOt94rFaOuRFSOvdC637RJzmX+UHnuxYBOzy/L7eM72XHyZReciGpQjsrI5xmm/LtLFjyhAC8BnAd8ayC4EhQ6AJrGwja7r8DEhA8AfA3f927zCKvgF4RAIax7+BGSLnAF77Th0IScLGtdE7ReM0f8OqkZ7QBSInZbj/hdiFo/1/AsBf/cQr1/97yo0AAAAASUVORK5CYII=",
          selectedColor: "#f5b15b",
        },
        {
          idx: 2,
          pagePath: "/service",
          text: "服务",
          iconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAApCAYAAAB3LnrpAAAEe0lEQVRogb3Za4gVZRzH8c/ZTVNSM0hoNZQoJLsgRSiZi2mo1YsoKjYqEsq8FNULQSgKohBSutiVEIqMit2K6KbQRSWzi0pEFyhSK4wsLOjiqiDb2ovnnJzznDkzc2ZPfmFgnuf5PTPP78xz+T/PqfT2btYGRmBc9f53HCxYrxPDW9A30NPTDTrKPgBzsAY7cAC7q9d+7KyWzcmof71guqg+kzJGpmMrNuBmnIZKoryCU6tlG7AdF6Q85zGMbUGfSStGKrgbH2FaC/XOwwdYHuX3t6jPpKiRCp7A/UK/jvkHv+BXDKaUd2IlnkrkLcWPQncsos+kqJE7cUtK/lu4HGMwHl04HlfinRT9Uiyr3q/DKdWriD6TIkbOwX1R3l7Mw2V4QxjsNfrxGi7GFfgrqruy+swagy3qUyli5GH13ek3dOO9AnVfx6yocbVu0w79f+QZORcXRnk34ru8Byf4AkuivLmaTxit6pFv5JoovRFv59RJow/borxr26jPNTI7Sj+do2/GYTwX5c1qoz7XyOlR+uMcfRbv5jx7SPosI8MxKpEeENaKssTrxQiMbpc+y0i8sHVKXwyLckyBd5TWZxkZwJ+JdAUTM/R5TI7S/ULA2BZ93hj5MkpflKPP4tIo/XU79XlGNkbpO5TrXscK0W2SDW3U5xp5SX2/PEN6zJXHMiGmqjGIF9qozzWyQ4iDkjyo8bNncbXGWK0X37ZJj2Kx1nL1g2w43sRd1ftmjBTC/j713fGAsK+JGdaivo60KS7mBywUulltJ9iJFViMtXhfmPc7hJltvrCVPTl61mEsqD4zyWSsF3aKRfSljBA+bRceUr+tnYh7qlcRluPVlPxnNZrI0jfQylb3eWGbW5YteKZJ2dSUvG0Z+gaKGOnE7diFmUUfnMJMfC/MevF7f0rRT8vQN5AnmIBNeFTYwjZjv7AZylutx+JJYUydlMi/V3r40UzfQJaRs4Rjn+6Usr+FMPsqYeyMqr50dPV+gjDYX8G+lPqz8akjEe3LmIFV0sdErG+g2WA/WziSOSHK78cDeLxqphl78GL1Go1bhQOMMQnNJGyuGtgp/Ghbq236rIC+jrQv0iVMhbGJTcIvsiLHRMw+wfwUjXuMcUK3GZfIG2hRj0YjHcKvGM//a4R988+Fm9/IHlwifM0kk4TwozIUfWxkkfTt7RLhEG6oDAoz4Noofx6uG4o+aWSUECIk2YLbhBW2nSzCJ1HeKiGsKaVPGlmMExPpg7hB6LPt5pBwQpM8/+0SjppK6WtGKsLxZJLVCsQ4Q2C3cPiXJG5DYX3NyHT1sc4hPFKyga2wWv2fPGdKD1ea6vv6PpzKESNzowrrhKPR/5s/hIPwJPPL6GtGZkSF60o3rXXWR+nzy+hrRqZEhdtLNqoM8bvyDu5S9TUj46PCXSUbVYYdUTpuSyF9pbd380j1/28MCNvOo0k/jkukh8me9hv0HcKKnfw/4vO2Na84yePRvfKjiAZ9hzDVLhA+2TfCSn60WYivhHXrJvmRRJ2+p6f78L9HtBdfkI2yewAAAABJRU5ErkJggg==",
          selectedIconPath:
            "data:image/png;base64,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",
          selectedColor: "#7977b2",
        },
        {
          idx: 3,
          pagePath: "/forumindex",
          text: "有话说",
          iconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAAB90lEQVRYhe2XsU4CQRCGfy4WaCyIsbPQwtJEqfUidJZYbSm+gW+glS2+AdgxiQU+gci+APbESGGhMYrGRDvMkFmybO6OIxwchX9CLjezk/kuuzszZOr1Vg5AA8Ah5q97ACUvRQBI3oaXIsAQZMkxfAIoA+glmGQVwLf1vi059o3BhSgr5TcSBAhSk0h3ANwZn2cvmgOAydO0373wpfPTP4TRQkC4t2NERHoPQE5sPaX8tvETabZv2ba4sbEhiDTf5apjO+YbJAB8wneJtHEPSrBSfi8ktujeCqPA7ZAk1QBXTZ5XDOD4uPKWiPTWmNh4EPw1AE4DXGfW88Hx3Srl15Tyn0JiLyaCEBAmzwMoyi8vNgNZsHxFKcVjY4PErbxvBWfCFiYtIj3Mu3B14idtiA8Ayynkf7MhvlIAYK3zDoycCalyM5fUEqNXt2LeEOlLAI+OvS3XcmrJh45UTnNFuwA2IxI8A9hxQYg0F6DzKcG6ngBkxyzckOJkA9QmBHgPsWd5O0oAWgB+I2Cu7dFPAE4mAGCtAXiRPEYrAI4y/X7fNKwDmYR5Mu7Y0Xb3CwCYZkIfnLUBRFwRaW5cFQegEDUrxFHssi0zQsUxl6cFQFyIoCGF23VSfxHGQkQAhLbmxCFmDRAXYqYArMhpW8QDLItHt8QBAOAPZyO6nGRNI2UAAAAASUVORK5CYII=",
          selectedIconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAAB80lEQVRYhe2XsUoDQRCG/xwW8bAQsbMwhaVgegW1szpi7YLxDXwDrWzjGxjhSou4L2D0CWIfxBQWimgUXe1OJsyGzXJ32ZBLLoV/c9zMTuY7dmd2Uvi+PlgE0ACwjenrFkDFyxEAnLfh5QjQB5mzDB8AqgC6GSZZAPBlvK9xjk1tsCGqfhA2MgSIU1NJ0QZwo32euWgKADpP03z3kpdOT/8QWjMBYVfHgJQUZQCLbOv6QdjSfiUF2UumzTXWGUJJQbV8Ydn2qYIYgE74hpJCu3st2A/CbkLsrl0VWrHbwUkuYlx1fp4TgOWjzltRUpSGxLpB0NcAOIpxHRvPe8t37Qdh3Q/Cx4TY0yQIukUjI3nBdDqcibKxvMXwQ2PZ38+bCjFJmRAz1yd+8oZ4BzCfQ/5XE+IzBwDSMu3AwJngEz1xcS/RerE75pWS4gzAg2UfKL9xxB860Dl1iXYArKb89hOAdRtESUEN6GRMro7HAMUhC1cA7FgA9REB3hLsRdqOCoA7AL8pMJfm6McAhyMAkJYAPHMeLR/AXiGKIt2Ct3gSpsm4bUabt18MwDgTeu+s9SBcpaSgi6tmAeykzQoucm7bPCPULHN1XAC4QsQNKXRdZ/UXYShECkDikJI5xKQBXCEmCkBKnbZZNMCSaHTLHAAA/gAKRcUlCGOTxwAAAABJRU5ErkJggg==",
          selectedColor: "#f5b15b",
        },
        {
          idx: 4,
          pagePath: "/xiaoluohao",
          text: "小罗号",
          iconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAAB6klEQVRYheWY0W3CMBCG/6K+lw3KBrCA1XSCpk9+TTdgg6YTlA2Ax3tq2IDKA5ROUDpB6QRUhy7UMSaJIYFK/SUkZOK7L3f2+czFer1GkyIyCYAUQBdApLVaVNlvDMJyfm0NfwPoaa1WZXMvW3Ke6wrAAMC8FYgK50EKhqhwzuEfAXgMsdkJcU5klgDGHgB2/iT5T0MAkEeCyPQAJCXPJRVvPqpafLnYl9ZqWYAgMjGAl0D4YOf4fdkFkRlqrSZbCDHWqnMB4LqRyY4ZExnkIJ2aq7uQ81CAPRpJZHZ2xzvnv06VCxWDS+oXEg3+cCQid3ekbQDkkgVpF64bIjNwIZoIc5WGzu9J7TrRlCQaM8vcTjpOJTsl/XNBFNbduSAK+tcQg78AEVvfX08OQWQiLlLWUOZCdE/A4RarHYiUy2hb3sV2ZA1NuXi5EH0Ab0QmlaPXNtA9BlBOzLkcXJCTeRMVhvj0zBk6BnjylwBm+REcIinXdpGK85ag48kRKyvpGe4AfBCZyQEwsbQL91qrbeneXH6cHnOltSp0W9yOAXjeY3gqLcDSet6+Ud3aDn2qfQOTrZU628sL0xpETRjfvaN5CAdmUqNHrYQ4uGKyYa0Vr6WHPTusto4u29y2l8BwegoXHZ/O//8EgB/9OeXrsDRw0gAAAABJRU5ErkJggg==",
          selectedIconPath:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAACXBIWXMAAAHGAAABxgEXwfpGAAAB8UlEQVRYheWY0W3CMBCG/6K+lw3KBjCApaYTNN0gfbLkJzZoOkF5ipQnYALSDajk99IJSiconYDq0Jk6JiQxJFCpv4SETHz35c4+n7lYr9doUkrqCEAMoAsgSFKxqLLfGITl/Noa/gbQS1KxKpt72ZJzoysAAwDzViAqnHvJG6LCOYV/BODRx2bHx7mSeglgXABAzp84/7EPAEwklNQ9AFHJc1HFm4+qFp8R+UpSscxBKKlDADNPeG/n+H3ZhZJ6mKRisoVgY606ZwCqGxnvmLGSGgakU3N153LuC7BHI47Mzu54p/zXqXK+InBO/YKjQR+KRODujrgNACNekHbhulFSD1yIJsJcpaHze1S7TjQljsaLZW4nHaeSnZL+uSBy6+5cEDn9a4jBX4AIre+vJ4dQUgdUpKyhzIXonoDDLVY7EDGV0ba8s+3AGppS8XIh+gDelNQxH722ge4xgHxizvngAp/Mm6gQxGfBnKFjgCZ/MWBmjmAfcbm2i1RoWoJOQY5IWUnPcAfgQ0k9OQAm5HbhPknFtnRvLj9Oj7lKUpHrtqgdA/C8x/CUW4Cl9bx9o7q1HRap9g2Mt1bsbK9CmNYgasIU3Tuah3BgJjV61EqIgysmGU5SQWvpYc8Oq62jyza17SUwlJ7cRadI5/9/AsAPTwrjazMi0awAAAAASUVORK5CYII=",
          selectedColor: "#7977b2",
        },
      ],
    });
    const activeIdx = inject("activeIdx");
    const updateActiveIdx = inject("updateActiveIdx");
    onMounted(() => {
      console.log(activeIdx);
    });
    return {
      data,
      activeIdx,
      updateActiveIdx,
    };
  },

};

</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}
.tabbar .tabbar-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
}
.tabbar-list {
  display: flex;
}

.tabbar-item {
  flex: 1;
  text-align: center;
  padding: 5px 0 0;
  font-size: smaller;
  color: #a09fbc;
}
.tabbar-item-icon img {
  width: 23px;
  height: 23px;
}
</style>
