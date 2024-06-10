import { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import IAmLoading from './Components/IAmLoading/IAmLoading';
import GetData from './Components/GetData/GetData';
import GetInfoTexts from './Components/GetData/GetInfoTexts';
import permittedLocations from './permittedLocations.json';
const LeftNav = lazy(() => import('./Components/NavBar/LeftNav'));
const InfoButton = lazy(() => import('./Components/InfoButton/InfoButton'));
const Index = lazy(() => import('./Components/Index/Index'));
const IndexQM = lazy(() => import('./Components/QueryMaker/IndexQM'));
const IndexStats = lazy(() => import('./Components/Stats/IndexStats'));
const IndexSR = lazy(() => import('./Components/ShowRequests/IndexSR'));
const Contacter = lazy(() => import('./Components/Contacter/Contacter'));
const Nf404 = lazy(() => import('./Components/404/404'));
function App() {
  const [data, setData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetData();
        await setAsyncData(result)
        setIsFetched(true);
      } catch (error) {
        console.error("Si è verificato un errore durante il recupero dei dati:", error);
      }
    };

    const setAsyncData = async (result) => {
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Suspense fallback={<IAmLoading />}>
        <AppRoutes {...{ isFetched, data }} />
      </Suspense>
    </Router>
  );
}

function AppRoutes({ isFetched, data }) {
  const location = useLocation();
  // const permittedLocations = ['/', '/query-builder', '/show-statistics-and-reports','request-a-new-report'];
  const isNotFoundRoute = !permittedLocations.includes(location.pathname);

  const checkInfoText = async () => {
    let infoTexts = await GetInfoTexts();
    if (!isNotFoundRoute) {
      switch (location.pathname) {
        case permittedLocations[0]:
          return `${infoTexts["homepage"]} ${infoTexts["defaultinfo"]}`;
          break;
        case permittedLocations[1]:
          return `${infoTexts["queryer"]} ${infoTexts["defaultinfo"]}`;
          break;
        case permittedLocations[2]:
          return `${infoTexts["stats"]} ${infoTexts["defaultinfo"]}`;
          break;
        case permittedLocations[3]:
          return `${infoTexts["seereqs"]}`;
          break;
        case permittedLocations[4]:
          return `${infoTexts["addrequest"]}`;
          break;
        case permittedLocations[5]:
          return `${infoTexts["reportaproblem"]}`;
          break;
        default:
          return infoTexts["defaultinfo"];
          break;
      }
    } else {
      return false;
    }
  };

  const [isShown, setIsShown] = useState(false);
  const [infoText, setInfoText] = useState();
  const [selectedOptionToPass, setSelectedOptionToPass] = useState([]);
  const [contentToPass, setContentToPass] = useState([]);
  const currentFollowingClass = 'table-show';
  //pagina 1
  const [referer, setReferer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [headers, setHeaders] = useState([]);
  const [content, setContent] = useState([]);
  //pagina 2
  const [selectedTable, setSelectedTable] = useState();
  const [tableIsSelected, setTableIsSelected] = useState(false);
  const [selectedTableFields, setSelectedTableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedFieldValues, setSelectedFieldsValues] = useState([])
  const [selectedFieldsObj, setSelectedFieldsObj] = useState([]);


  const handleSelectChange = (selectedOption) => {
    setSelectedOptionToPass(selectedOption)
    setSelectedOption(selectedOption);
    setIsOpen(false)
  };

  const handleSelectTableChange = (selectedTable) => {
    setSelectedOptionToPass(selectedTable)
    setSelectedTable(selectedTable);
    setIsOpen(false);
  };

  const handleSelectedFields = (selectedFields) => {
    setSelectedFields(selectedFields);
  };

  useEffect(() => {
    const fetchInfoT = async () => {
      const result = await checkInfoText();
      setInfoText(result);
    };
    setContent([]);
    setHeaders([]);
    setSelectedOption();
    setSelectedFields([])
    setSelectedTableFields([])
    setSelectedTable();
    setTableIsSelected(false);
    setSelectedFieldsValues([])
    setSelectedFieldsObj([]);
    setContentToPass([]);
    setSelectedOptionToPass([]);
    setIsOpen(false);
    setIsShown(false);
    const referrerValue = (document.referrer === '' || document.referrer === null || document.referrer === undefined) ? null : document.referrer;
    setReferer(referrerValue);
    fetchInfoT();
  }, [location.pathname]);

  useEffect(() => {
    if (selectedOption && data) {
      const { value } = selectedOption;
      const selectedData = data[value] || [];
      setContent(selectedData);
      setContentToPass(selectedData);
      setHeaders(selectedData.length > 0 ? Object.keys(selectedData[0]) : []);
    } else {
      setContent([]);
      setHeaders([]);
      setContentToPass([]);
    }
  }, [selectedOption, data]);


  useEffect(() => {
    if (selectedFields.length > 0) {
      const fieldValues = selectedFields.map(field => field.value);
      setSelectedFieldsValues(fieldValues);
      const selectedFieldsObj = data[selectedTable.value].map(item => {
        const obj = {};
        fieldValues.forEach(field => {
          if (item.hasOwnProperty(field)) {
            obj[field] = item[field];
          }
        });
        return obj;
      });
      setSelectedFieldsObj(selectedFieldsObj);
      setContentToPass(selectedFieldsObj);
    } else {
      setSelectedFieldsValues([]);
      setSelectedFieldsObj([]);
      setContentToPass([]);
    }
  }, [selectedFields, selectedTable, data]);

  useEffect(() => {
    if (selectedTable && data) {
      setSelectedFields([])
      setSelectedTableFields([])
      const { value } = selectedTable;
      const selectedTableFields = data[value].length ? Object.keys(data[value][0]) : [];
      if (!selectedTableFields.length) {
        setTableIsSelected(null);
      } else {
        setTableIsSelected(true);
        setSelectedTableFields(selectedTableFields)
      }
    } else {
      setSelectedFields([])
      setSelectedTableFields([])
    }
  }, [selectedTable, data]);


  useEffect(() => {
    const handleOutsideClickFromLN = (event) => {
      if (!event.target.closest('.left-nav')) {
        setIsOpen(false);
      }
    };

    const handleOutsideClickFromInfo = (event) => {
      if (!event.target.closest('.info-container')) {
        setIsShown(false);
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleOutsideClickFromLN);
    }
    if (isShown) {
      document.addEventListener("click", handleOutsideClickFromInfo);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClickFromLN);
      document.removeEventListener("click", handleOutsideClickFromInfo);
    };
  }, [isOpen, isShown]);
  return (
    <>
      {!isNotFoundRoute &&
        <>
          <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isOpen'}>
            <LeftNav isOpen={isOpen} setIsOpen={setIsOpen}
              selectedOption={selectedOptionToPass}
              content={contentToPass} />
          </StyleSheetManager>
          <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isShown'}>
            <InfoButton text={infoText} isShown={isShown} setIsShown={setIsShown} />
          </StyleSheetManager>
        </>}
      <Routes>
        <Route path={permittedLocations[0]} element={
          <Index {...{ isFetched, currentFollowingClass, data }}
            handleSelectChange={handleSelectChange} selectedOption={selectedOption}
            content={content} headers={headers} />
        } />
        <Route path={permittedLocations[1]} element={
          <IndexQM {...{ isFetched, currentFollowingClass, data }}
            handleSelectTableChange={handleSelectTableChange} selectedTable={selectedTable}
            tableIsSelected={tableIsSelected} selectedTableFields={selectedTableFields}
            selectedFields={selectedFields} handleSelectedFields={handleSelectedFields}
            selectedFieldValues={selectedFieldValues} selectedFieldsObj={selectedFieldsObj} />
        } />
        <Route path={permittedLocations[2]} element={<IndexStats {...{ isFetched, data }} />} />
        <Route path={permittedLocations[3]} element={<IndexSR />} />
        <Route path={permittedLocations[4]} element={<Contacter type={0} />} />
        <Route path={permittedLocations[5]} element={<Contacter type={1} />} />
        {(!referer || isNotFoundRoute) && <Route path="*" element={<Nf404 />} />}
      </Routes>
    </>
  );
}
export default App