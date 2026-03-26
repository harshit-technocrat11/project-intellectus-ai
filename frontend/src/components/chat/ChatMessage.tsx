interface Props {
  message: any;
}

export default function ChatMessage({ message }: Props) {
  return (
    <div
      className={`p-4 rounded-lg max-w-3xl ${
        message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
      }`}
    >
      <p>{message.content}</p>

      {message.sql && (
        <pre className="bg-black text-green-400 text-xs p-3 mt-3 rounded overflow-x-auto">
          {message.sql}
        </pre>
      )}

      {message.table && (
        <table className="mt-4 border w-full text-sm">
          <thead>
            <tr>
              {message.table.columns.map((col: string) => (
                <th key={col} className="border px-2 py-1">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {message.table.rows.map((row: any[], i: number) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border px-2 py-1">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
