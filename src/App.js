import { Box, Divider, IconButton, Button, Card, CardContent } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    ambilData()
    console.log(quotes)
  }, [])

  const ambilData = async () => {
    try {
      await axios.get("https://api.quotable.io/quotes/random").then((response) => {
        setQuotes(response.data);
      })
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: '100%',
          bgcolor: "blue"
        }}>
          <Card id="quote-box" sx={{ maxWidth: 1000, borderRadius: "10px" }}>
            {quotes.map((quote) =>
              <CardActionArea sx={{
                padding: "40px"
              }} key={quote._id}>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div" textAlign={"center"}>
                    Quotes of the day
                  </Typography>
                  <Typography id="text" variant="h6" color="text.secondary" textAlign={"center"}>
                    {quote.content}
                  </Typography>
                  <Typography id="author" mt={5} variant="h5" color="text.secondary" textAlign={"right"}>
                  {quote.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
              )}
          <CardContent>
              <Divider />
              <Box sx={{
                padding: "10px",
                display: "flex",
              }}>
              <IconButton aria-label="speech">
                <VolumeUpIcon/>
              </IconButton>
              <IconButton aria-label="copy">
                <ContentCopyIcon/>
              </IconButton>
              <a id="tweet-quote" target="_blank" href="twitter.com/intent/tweet">
                <IconButton aria-label="twitter">
                  <TwitterIcon/>
                </IconButton>
              </a>
              
              <Button id="new-quote" onClick={ambilData} sx={{
                  display: "flex",
                  justifyContent: "flex-end"
              }} variant="contained">New Quotes</Button>
              </Box>
            </CardContent>  
        </Card>
        </Box>
  );
}

export default App;
