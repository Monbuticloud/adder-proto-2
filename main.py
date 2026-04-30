val2 = 0
x2 = 0
val1 = 0
flashstatus = False
ismd = False

def bintodisstr(x: int):
    out = ""
    for i in range(4, -1, -1):
        out += "#" if (x >> i) & 1 else "."
    return out
def showstr(string: str, row: int):
    i = 0
    returnstr = ""
    for char in string:
        if char == "#":
            led.plot(i, row)
            returnstr = returnstr + "#"
        else:
            led.unplot(i, row)
            returnstr = returnstr + "."
        i += 1
    return returnstr + "\n"

def on_forever():
    global flashstatus, val1, val2, ismd
    flashstatus = False if flashstatus else True
    val1 = val1 % 32
    val2 = val2 % 32
    if (input.is_gesture(Gesture.SHAKE) or input.pin_is_pressed(TouchPin.P2)):
        val1 = 0
        val2 = 0
        ismd = False
    # if input.is_gesture(Gesture.SCREEN_DOWN):
    if input.pin_is_pressed(TouchPin.P0):
        ismd = True
    elif input.pin_is_pressed(TouchPin.P1):
        ismd = False
    line1 = bintodisstr(val1)
    line2 = bintodisstr(val2)
    line3 = "#####" if ismd else "....."
    line4 = bintodisstr((val1 * val2) if ismd else (val1 + val2))
    line5 = bintodisstr(((val1 // val2) if val2 != 0 else (31 if flashstatus else 0)) if ismd else ((val1 - val2) if (val1 - val2)>= 0 else ((31 if flashstatus else 0))))
    
    res = str(val1) + "|" + str(val2) + "\n"
    res = res + "Value 1: " + showstr(line1, 0)
    res = res + "Value 2: " + showstr(line2, 1)
    res = res + "Is md?:" + showstr(line3, 2)
    res = res + "Add/Mul" + showstr(line4, 3)
    res = res + "Min/Div" + showstr(line5, 4)
    res = res + "\n"
    print(res)
    



    
    
basic.forever(on_forever)

def on_button_pressed_a():
    global val1
    if input.logo_is_pressed():
        val1 -= 1
        return
    val1 += 1
input.on_button_pressed(Button.A, on_button_pressed_a)



def on_button_pressed_b():
    global val2
    if input.logo_is_pressed():
        val2 -= 1
        return
    val2 += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

