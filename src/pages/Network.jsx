import { useState } from "react";

export default function Network() {
  const [selectedNode, setSelectedNode] = useState(null);

  const tree = {
    id: "LA100001",
    name: "Abdul",
    status: "Active",
    earnings: "₹12,400",
    left: {
      id: "LA742147",
      name: "Demo",
      status: "Active",
      earnings: "₹5,200",
      left: { id: "LA461303", name: "Demo1", status: "Inactive", earnings: "₹0" },
      right: { id: "LA960875", name: "Demo2", status: "Active", earnings: "₹1,500" },
    },
    right: {
      id: "LA201799",
      name: "Demo",
      status: "Inactive",
      earnings: "₹0",
      left: { id: "LA000000", name: "Empty", status: "Inactive", earnings: "₹0" },
      right: { id: "LA884743", name: "SM Shafi", status: "Active", earnings: "₹3,000" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">

      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-10">
        Binary Network Tree
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[1100px] flex justify-center">
          <TreeNode node={tree} onSelect={setSelectedNode} />
        </div>
      </div>

      {/* DIALOG */}
      {selectedNode && (
        <ProfileDialog
          user={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

/* ================= TREE NODE ================= */

function TreeNode({ node, onSelect }) {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center relative">

      {/* NODE CARD */}
      <div
        onClick={() => onSelect(node)}
        className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
        rounded-xl px-6 py-4 shadow-md hover:shadow-xl hover:scale-105 transition min-w-[180px] text-center"
      >
        <div className="w-14 h-14 mx-auto mb-3 rounded-full overflow-hidden border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm font-semibold text-blue-600">{node.id}</p>
        <p className="text-xs text-gray-500">{node.name}</p>
      </div>

      {(node.left || node.right) && (
        <>
          <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>

          <div className="flex gap-40 relative">
            <div className="absolute top-0 left-1/2 w-full h-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2"></div>

            <div className="flex flex-col items-center">
              {node.left && (
                <>
                  <div className="w-px h-10 bg-gray-300 dark:bg-gray-700"></div>
                  <TreeNode node={node.left} onSelect={onSelect} />
                </>
              )}
            </div>

            <div className="flex flex-col items-center">
              {node.right && (
                <>
                  <div className="w-px h-10 bg-gray-300 dark:bg-gray-700"></div>
                  <TreeNode node={node.right} onSelect={onSelect} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= DIALOG ================= */

function ProfileDialog({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-[400px] shadow-2xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* AVATAR */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white">
          {user.name}
        </h2>

        <p className="text-sm text-center text-gray-500 mb-6">
          {user.id}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Status:</span>
            <span
              className={`font-medium ${user.status === "Active"
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {user.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Earnings:</span>
            <span className="font-medium">{user.earnings}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
