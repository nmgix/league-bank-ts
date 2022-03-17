import React, { useState } from "react";
import { YMaps, Map as YMap, Placemark, MapState } from "react-yandex-maps";
import { IMapCheckboxes, IMapCheckboxesEnum } from "../../interfaces/IMap";
import { LabelCheckbox } from "../essentials/LabelCheckbox";
import LocationMarker from "../../images/location.svg";

export const Map: React.FC<{ id: string }> = ({ id }) => {
  const [ActiveMarkers, setActiveMarkers] = useState<IMapCheckboxes>({
    russia: true,
    sng: true,
    europe: true,
  });

  const mapData: MapState = {
    center: [52.75897861, 38.6158744],
    zoom: 4,
  };

  const coordinates = {
    russia: [
      [55.75897861, 37.6158744],
      [58.59281591, 49.66310862],
      [51.55538262, 46.059593],
      [57.18885551, 65.57131175],
      [55.00336661, 73.30568675],
      [59.94241846, 30.2392805],
    ],
    sng: [
      [40.36391621, 49.83888987],
      [41.29850313, 69.30666331],
      [53.87639833, 27.55861644],
      [43.22421706, 76.90920237],
    ],
    europe: [
      [48.9644317, 2.29006175],
      [50.05179937, 14.50685862],
      [51.61013852, -0.08298513],
      [42.05625121, 12.6611555],
    ],
  };

  return (
    <div id={id}>
      <h1>Отделения Лига Банка</h1>
      <div className='checkboxes'>
        <ul>
          <li>
            <LabelCheckbox
              field='russia'
              state={ActiveMarkers}
              defaultValue={true}
              label='Россия'
              setState={setActiveMarkers}
            />
          </li>
          <li>
            <LabelCheckbox
              field='sng'
              state={ActiveMarkers}
              defaultValue={true}
              label='СНГ'
              setState={setActiveMarkers}
            />
          </li>
          <li>
            <LabelCheckbox
              field='europe'
              state={ActiveMarkers}
              defaultValue={true}
              label='Европа'
              setState={setActiveMarkers}
            />
          </li>
        </ul>
      </div>
      <YMaps>
        <YMap defaultState={mapData} width={"100%"} height={"462px"}>
          {/* {Object.keys(ActiveMarkers).map((country: string, index: number) => 
            ActiveMarkers[index] ? (
              coordinates[index].map(
                (coordinate: number[], index) => (
                  <Placemark
                    geometry={coordinate}
                    key={index}
                    properties={{
                      iconContent: "iconContent",
                    }}
                    options={{
                      iconLayout: "default#image",
                      iconImageSize: [30, 35],
                      iconImageHref: LocationMarker,
                    }}
                  />
                )
              )
            ) : <></>
          )} */}
          {ActiveMarkers.russia ? (
            coordinates.russia.map((coordinate: number[], index) => (
              <Placemark
                geometry={coordinate}
                key={index}
                properties={{
                  iconContent: "iconContent",
                }}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 35],
                  iconImageHref: LocationMarker,
                }}
              />
            ))
          ) : (
            <></>
          )}
          {ActiveMarkers.europe ? (
            coordinates.europe.map((coordinate: number[], index) => (
              <Placemark
                geometry={coordinate}
                key={index}
                properties={{
                  iconContent: "iconContent",
                }}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 35],
                  iconImageHref: LocationMarker,
                }}
              />
            ))
          ) : (
            <></>
          )}
          {ActiveMarkers.sng ? (
            coordinates.sng.map((coordinate: number[], index) => (
              <Placemark
                geometry={coordinate}
                key={index}
                properties={{
                  iconContent: "iconContent",
                }}
                options={{
                  iconLayout: "default#image",
                  iconImageSize: [30, 35],
                  iconImageHref: LocationMarker,
                }}
              />
            ))
          ) : (
            <></>
          )}
        </YMap>
      </YMaps>
    </div>
  );
};
