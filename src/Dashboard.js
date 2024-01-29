import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrScanner } from '@yudiel/react-qr-scanner';
import isAuthenticated from './authCheck.js';
import Catalog from './Catalog';
import Floorplan from './Floorplan';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './tombol.css';

function Dashboard() {
  const navigate = useNavigate();
  let [auth, setAuth] = useState({ "success": false, "role": "" });
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await isAuthenticated();
        setAuth(response);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleDecode = (result) => {
    const url = new URL(result);
    const path = url.pathname;

    const parameters = path.split('/');

    if (url.hostname != window.location.hostname) return;

    const table_id = parameters[2];
    navigate('scan/' + table_id)
  };

  const handleError = (error) => {
    console.error('QR code scanning error:', error?.message);
  };

  return (
    <div>
      {auth.role === "admin" || auth.role === "clerk" ? (
        <>
          <Tabs defaultActiveKey="katalog" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="katalog" title="katalog">
              <Catalog auth={auth} />
            </Tab>
            <Tab eventKey="denah" title="denah">
              <Floorplan auth={auth} />
            </Tab>
          </Tabs>
        </>
      ) : (
        <>
          <div style={{ display: showScanner ? 'none' : '' }}><Catalog /></div>
          {/* <div style={{ position: 'absolute', marginLeft: '40%', marginTop: '120%', bottom: '5%', width: '15vh', height: '15vh', borderRadius: '50%', backgroundColor: 'gray' }} onClick={() => setShowScanner(!showScanner)}><h1>{!showScanner ? 'scan meja' : 'tutup'}</h1></div> */}
          {showScanner && (
            <div>
              <QrScanner
                onDecode={handleDecode}
                onError={handleError}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
