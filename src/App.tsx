// @ts-nocheck
import React from "react";
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { useMultiplayerState } from "./hooks/useMultiplayerState";
import { roomID } from "./store";
import {
  doc,
  yShapes
} from "./store";

const App: React.FC = () => {
  const fileSystemEvents = useFileSystem();
  const multiplayerEvents = useMultiplayerState(roomID);

  const draw = () => {
    const randX = Math.floor(Math.random() * 1000) + 100;
    const randY = Math.floor(Math.random() * 1000) + 100;
    const GUID = () => {
        var d = new Date().getTime();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    
    const idd = GUID();
    const shapes = JSON.stringify({
        idd: {
          "id": idd,
          "type": "rectangle",
          "name": "Rectangle",
          "parentId": "page",
          "childIndex": 1,
          "point": [
            randX,
            randY
          ],
          "size": [
            500,
            700
          ],
          "rotation": 0,
          "style": {
            "color": "black",
            "size": "small",
            "isFilled": false,
            "dash": "draw",
            "scale": 1
          },
          "label": "",
          "labelPoint": [
            0.5,
            0.5
          ]
        }
      })
    
    doc.transact(() => {
      Object.entries(JSON.parse(shapes)).forEach(([id, shape]) => {
        yShapes.set(shape.id, shape);
      });
    });
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('Drawing')
      draw()
    }, 1000);

    return () => clearInterval(interval);
  }, [draw])

  return (
    <div className="tldraw">
      <Tldraw 
        autofocus
        disableAssets
        showPages={false} 
        showMultiplayerMenu={false} 
        {...multiplayerEvents}
        {...fileSystemEvents}
      />
    </div>
  );
};

export default App;
