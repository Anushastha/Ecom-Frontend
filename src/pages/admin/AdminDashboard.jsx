import React, { useEffect, useState } from "react";
import { getLogsApi } from "../../apis/Apis";

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogsApi();
        if (response.data.success) {
          setLogs(response.data.logs);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div
      style={{
        padding: "40px 100px",
      }}
    >
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <p className="font-primary font-bold" style={{ fontSize: "30px" }}>
          User Action Logs
        </p>
      </div>

      <div className="bg-white p-4 shadow">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center font-primary">
              <tr>
                <th scope="col">Timestamp</th>
                <th scope="col">User</th>
                <th scope="col">Action</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody className="text-center font-secondary">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>
                      {log.userId.fullName} ({log.userId.email})
                    </td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
