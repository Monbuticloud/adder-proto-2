let val2 = 0
let x2 = 0
let val1 = 0
let flashstatus = false
let ismd = false
function bintodisstr(x: number): string {
    let out = ""
    for (let i = 4; i > -1; i += -1) {
        out += x >> i & 1 ? "#" : "."
    }
    return out
}

function showstr(string: string, row: number) {
    let i = 0
    let returnstr = ""
    for (let char of string) {
        if (char == "#") {
            led.plot(i, row)
            returnstr = returnstr + "#"
        } else {
            led.unplot(i, row)
            returnstr = returnstr + "."
        }
        
        i += 1
    }
    return returnstr + "\n"
}

basic.forever(function on_forever() {
    
    flashstatus = flashstatus ? false : true
    val1 = val1 % 32
    val2 = val2 % 32
    if (input.isGesture(Gesture.Shake) || input.pinIsPressed(TouchPin.P2)) {
        val1 = 0
        val2 = 0
        ismd = false
    }
    
    //  if input.is_gesture(Gesture.SCREEN_DOWN):
    if (input.pinIsPressed(TouchPin.P0)) {
        ismd = true
    } else if (input.pinIsPressed(TouchPin.P1)) {
        ismd = false
    }
    
    let line1 = bintodisstr(val1)
    let line2 = bintodisstr(val2)
    let line3 = ismd ? "#####" : "....."
    let line4 = bintodisstr(ismd ? val1 * val2 : val1 + val2)
    let line5 = bintodisstr(ismd ? (val2 != 0 ? Math.idiv(val1, val2) : (flashstatus ? 31 : 0)) : (val1 - val2 >= 0 ? val1 - val2 : (flashstatus ? 31 : 0)))
    let res = "" + val1 + "|" + ("" + val2) + "\n"
    res = res + "Value 1: " + showstr(line1, 0)
    res = res + "Value 2: " + showstr(line2, 1)
    res = res + "Is md?:" + showstr(line3, 2)
    res = res + "Add/Mul" + showstr(line4, 3)
    res = res + "Min/Div" + showstr(line5, 4)
    res = res + "\n"
    console.log(res)
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (input.logoIsPressed()) {
        val1 -= 1
        return
    }
    
    val1 += 1
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (input.logoIsPressed()) {
        val2 -= 1
        return
    }
    
    val2 += 1
})
