for /r %%b in (*.mp4) do (
ffmpeg -i "%%b" "converted\%%~nb.mp3"
)
pause