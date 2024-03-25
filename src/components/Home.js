import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [word, setWord] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const getDefinition = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(apiUrl);
            setData(response.data[0]);
            setError('');
        } catch (error) {
            setError('Failed to fetch data. Please try again later.');
            setData(null);
        }
    };
    const playAudio = () => {
            if (data && data.phonetics) {
              const audioUrl = data.phonetics[0]?.audio || data.phonetics[1]?.audio;
              if (audioUrl) {
                  const audio = new Audio(audioUrl);
                  audio.play();
              }
          }
          };

    return (
        <div className="App">
            <header>
                <h1>Dictionary</h1>
                <form onSubmit={getDefinition}>
                    <input
                        type="text"
                        id='textbox'
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Enter word"
                        onkeydown = "if (event.keyCode == 13).click()" 
                    />
                    <button className='search-button' id='btnSearch' type="submit">Search</button>
                </form>
            </header>
            {error && <div className="error">
                    <h1>No results found for {word}!</h1>
                </div>}
            {data && (
                <div className="definition" id='results'>
                  <div className='result'>
                 <div className='word'>
                    <h2>{data.word}</h2>
                    <button className='speaker' onClick={()=>{playAudio()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
   <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
   <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
   <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
 </svg>
                 </button>
                 </div>
                    {data.meanings.map((meaning, index) => (
                        <div key={index}>
                            <h3>{meaning.partOfSpeech}</h3>
                            <ul>
                                {meaning.definitions.map((definition, index) => (
                                    <li key={index}>
                                        <strong>Definition:</strong> {definition.definition}
                                        {definition.example && (
                                            <>
                                                <br />
                                                <strong>Example:</strong> {definition.example}
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            <footer>
             <p>&copy; 2024 DictionaryApp</p>
           </footer>
        </div>
    );
}

export default Home;



// import React, { useState } from 'react';
// import axios from 'axios';

// function Home() {
//     const [word, setWord ] = useState('');
//     const [data, setData ] = useState('');
//     const [error, setError] = useState('');

//     const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
//     const getMeaning = async (e) => {
//       e.preventDefault();
//       try{
//         const response = await axios.get(api);
//         setData(response.data[0]);
//         setError('');
//         console.log(response.data[0]);
//       } catch (error) {
//           setError("Failed to fetch data. Please try again later.");
//       }
//     };

//     const playAudio = () => {
//       if (data && data.phonetics) {
//         const audioUrl = data.phonetics[0]?.audio || data.phonetics[1]?.audio;
//         if (audioUrl) {
//             const audio = new Audio(audioUrl);
//             audio.play();
//         }
//     }
//     };
//     return (
//     <div className='app'>
//       <header>
//       <h1>Dictionary</h1>
//       <form className='search-bar' onSubmit={getMeaning}>
//         <input type='text' placeholder='Search...' onChange={(e)=>setWord(e.target.value)}/>
//         <button className='search-button' type='submit'>Search</button>
//       </form>
//       </header>
//       { error ? <div className='error'>{error}</div> :
//         data && (
//             <div className='result-conatiner' id='results'>
//               <div className='result'>
//                 <div className='word'>
//                   <h1 className='word-title'>{data.word}</h1>
//                   <button className='speaker' onClick={()=>{playAudio()}}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
//   <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
//   <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
//   <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
// </svg>
//                 </button>
//                 </div>
//                 <p>{data.meanings[0]?.partOfSpeech}</p>
//                 <h4>Defination:</h4>
//                 {
//                     data.meanings[0]?.definitions.map((def,index)=>(
//                         <p className='word-defination' key={index}>{index+1+'.'}{def.definition}</p>
//                 ))
//                 }
//                 { (data.meanings[0]?.definitions[0]?.example) ?  (
//                 <>
//                 <h4>Example</h4>
//                 <p>{data.meanings[0].definitions[0].example}</p>
//                 </>) : <>
//                 <h4>Example</h4>
//                 <div>
//                     {data.meanings[0]?.definitions.map((def,index)=>(
//                         <p key={index}>{def.example}</p>
//                     ))}
//                     </div>
//                     </> 
//                 }
//               { (data.meanings[0].synonyms == '') ? '' :
//               <div>
//                 <h4>Synonyms</h4>
//                 <p>{data.meanings[0].synonyms+""}</p>
//               </div>
//                }
//               </div>
//             </div>
//         )
//       }
//       <footer>
//         <p>&copy; 2024 DictionaryApp</p>
//       </footer>
//     </div>
//   )
// }

// export default Home;


// /*
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [word, setWord ] = useState('');
//     const [data, setData ] = useState('');

//     const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//     const getMeaning = async (e) => {
//       e.preventDefault();
//       try{
//         const response = await axios.get(api);
//         setData(response.data[0]);
//         console.log(response.data[0]);
    
//       } catch (error) {
//         console.log("Error:", error)
//       }
//     }
//     const playAudio = () => {
//       let audio =(data.phonetics[0].audio) ? new Audio(data.phonetics[0].audio) : new Audio(data.phonetics[1].audio);
//         audio.play();
//     }
//     return (
//     <div className='app-container'>
//       <header>
//       <h1>Dictionary</h1>
//       <form className='search-bar' onSubmit={getMeaning}>
//         <input type='text' placeholder='Search...' onChange={(e)=>setWord(e.target.value)}/>
//         <button className='search-button' type='submit'>Search</button>
//       </form>
//       </header>
//       {
//         data && (
//             <div className='result-conatiner' id='results'>
//               <div className='word-card result'>
//                 <h1 className='word-title'>{data.word}</h1>
//                 <button onClick={()=>{playAudio()}}>Play</button>
//                 <h4>Parts of speech:</h4>
//                 <p>{data.meanings[0].partOfSpeech}</p>
//                 <h4>Defination:</h4>
//                 {
//                     data.meanings[0].definitions.map((def,index)=>(
//                         <p className='word-defination' key={index}>{def.definition}</p>
//                 ))
//                 }
//                 { data.meanings[0].definitions[0].example ? 
//                 <div>
//                 <h4>Example</h4>
//                 <p>{data.meanings[0].definitions[0].example}</p>
//                 </div>
//                 : ""
//               }
//               { data.meanings[0].synonyms ? 
//               <div>
//                 <h4>Synonyms</h4>
//                 <p>{data.meanings[0].synonyms+""}</p>
//               </div> : ""
// }
//               </div>
//             </div>
//         )
//       }
//       <footer>
//         <p>&copy; 2024 DictionaryApp</p>
//       </footer>
//     </div>
//   )
// }

// export default App */