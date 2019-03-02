function love.load() 
    timer = 0
    text = ""
    typeText("Hello World")
end

function love.update(dt)
    timer = timer + 1
end

function love.draw()
    love.graphics.print(text .. " " .. timer, 100, 100)
end

function typeText(txt, x, y)
    if(timer % 1000 == 0) then
        for i = 1, string.len(txt) do
            text = txt:sub(i,i)
        end
    end
end