/* GCompris - colormix.js'
*
* Copyright (C) 2014 Stephane Mankowski <stephane@mankowski.fr>
*
* Authors:
*   Matilda Bernard <serah4291@gmail.com> (GTK+ version)
*   Stephane Mankowski <stephane@mankowski.fr> (Qt Quick port)
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program; if not, see <http://www.gnu.org/licenses/>.
*/
var url = "qrc:/gcompris/src/activities/color_mix/resource/"

var currentLevel = 0
var numberOfLevel = 4
var items
var maxSteps = 1

function start(items_) {
    items = items_
    currentLevel = 0
    initLevel()
}

function stop() {}

function initLevel() {
    items.bar.level = currentLevel + 1

    /* Set max steps */
    maxSteps = items.bar.level + 1 * 2 + 1
    items.maxSteps = maxSteps

    /* Compute target color */
    items.targetColor1 = Math.floor(Math.random() * maxSteps)
    items.targetColor2 = Math.floor(Math.random() * maxSteps)
    items.targetColor3 = Math.floor(Math.random() * maxSteps)

    /* Reset current comor */
    items.currentColor1 = 0
    items.currentColor2 = 0
    items.currentColor3 = 0
}

function getColor(i1, i2, i3) {
    return activity.modeRGB ? Qt.rgba(i1 / maxSteps, i2 / maxSteps,
                                      i3 / maxSteps,
                                      1) : Qt.rgba(1 - i3 / maxSteps,
                                                   1 - i1 / maxSteps,
                                                   1 - i2 / maxSteps, 1)
}

function getColorFromHsl(h, s, l) {
    var r, g, b

    if (s === 0) {
        r = g = b = l // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1
            if (t > 1)
                t -= 1
            if (t < 1 / 6)
                return p + (q - p) * 6 * t
            if (t < 1 / 2)
                return q
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return Qt.rgba(r, g, b, 1)
}
function nextLevel() {
    if (numberOfLevel <= ++currentLevel) {
        currentLevel = 0
    }
    initLevel()
}

function previousLevel() {
    if (--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }
    initLevel()
}