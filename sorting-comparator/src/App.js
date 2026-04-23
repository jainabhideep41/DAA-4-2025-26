import React, { useState } from 'react';
import { Play, RotateCcw, Plus, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SortingComparator = () => {
  const [input, setInput] = useState('64, 34, 25, 12, 22, 11, 90');
  const [algorithms, setAlgorithms] = useState({
    bubble: true,
    selection: true,
    insertion: true,
    merge: true,
    quick: true,
    heap: true
  });
  const [sortingStates, setSortingStates] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [stats, setStats] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState(true);

  const parseInput = (str) => {
    return str.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const algoColors = {
    bubble: '#ef4444',
    selection: '#f59e0b',
    insertion: '#10b981',
    merge: '#3b82f6',
    quick: '#8b5cf6',
    heap: '#ec4899'
  };

  // Bubble Sort
  const bubbleSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        steps.push({ array: [...array], comparing: [j, j + 1], sorted: [], comparisons, swaps });
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
        }
      }
    }
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  // Selection Sort
  const selectionSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    for (let i = 0; i < array.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        comparisons++;
        steps.push({ array: [...array], comparing: [minIdx, j], sorted: [], comparisons, swaps });
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        swaps++;
      }
    }
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  // Insertion Sort
  const insertionSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      
      while (j >= 0 && array[j] > key) {
        comparisons++;
        array[j + 1] = array[j];
        swaps++;
        steps.push({ array: [...array], comparing: [j, j + 1], sorted: [], comparisons, swaps });
        j--;
      }
      if (j >= 0) comparisons++;
      array[j + 1] = key;
    }
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  // Merge Sort
  const mergeSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    const merge = (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;
      const L = arr.slice(l, m + 1);
      const R = arr.slice(m + 1, r + 1);
      
      let i = 0, j = 0, k = l;
      
      while (i < n1 && j < n2) {
        comparisons++;
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        swaps++;
        steps.push({ array: [...arr], comparing: [k], sorted: [], comparisons, swaps });
        k++;
      }
      
      while (i < n1) {
        arr[k] = L[i];
        swaps++;
        steps.push({ array: [...arr], comparing: [k], sorted: [], comparisons, swaps });
        i++;
        k++;
      }
      
      while (j < n2) {
        arr[k] = R[j];
        swaps++;
        steps.push({ array: [...arr], comparing: [k], sorted: [], comparisons, swaps });
        j++;
        k++;
      }
    };
    
    const mergeSortHelper = (arr, l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        mergeSortHelper(arr, l, m);
        mergeSortHelper(arr, m + 1, r);
        merge(arr, l, m, r);
      }
    };
    
    mergeSortHelper(array, 0, array.length - 1);
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  // Quick Sort
  const quickSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({ array: [...arr], comparing: [j, high], sorted: [], comparisons, swaps });
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      return i + 1;
    };
    
    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
      }
    };
    
    quickSortHelper(array, 0, array.length - 1);
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  // Heap Sort
  const heapSort = async (arr) => {
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    const steps = [];
    
    const heapify = (arr, n, i) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      
      if (l < n) {
        comparisons++;
        if (arr[l] > arr[largest]) largest = l;
      }
      
      if (r < n) {
        comparisons++;
        if (arr[r] > arr[largest]) largest = r;
      }
      
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        swaps++;
        steps.push({ array: [...arr], comparing: [i, largest], sorted: [], comparisons, swaps });
        heapify(arr, n, largest);
      }
    };
    
    const n = array.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      swaps++;
      steps.push({ array: [...array], comparing: [0, i], sorted: [], comparisons, swaps });
      heapify(array, i, 0);
    }
    
    steps.push({ array: [...array], comparing: [], sorted: array.map((_, i) => i), comparisons, swaps });
    return { steps, comparisons, swaps };
  };

  const runSorting = async () => {
    const arr = parseInput(input);
    if (arr.length === 0) return;
    
    setIsRunning(true);
    setGraphData([]);
    
    const algos = {
      bubble: algorithms.bubble ? bubbleSort : null,
      selection: algorithms.selection ? selectionSort : null,
      insertion: algorithms.insertion ? insertionSort : null,
      merge: algorithms.merge ? mergeSort : null,
      quick: algorithms.quick ? quickSort : null,
      heap: algorithms.heap ? heapSort : null
    };
    
    const results = {};
    const newStats = {};
    
    for (const [name, fn] of Object.entries(algos)) {
      if (fn) {
        const result = await fn(arr);
        results[name] = { steps: result.steps, currentStep: 0 };
        newStats[name] = { 
          comparisons: result.comparisons, 
          swaps: result.swaps,
          time: result.steps.length 
        };
      }
    }
    
    setSortingStates(results);
    setStats(newStats);
    
    const maxSteps = Math.max(...Object.values(results).map(r => r.steps.length));
    const graphDataPoints = [];
    
    for (let step = 0; step < maxSteps; step++) {
      await sleep(speed);
      
      const dataPoint = { step };
      
      setSortingStates(prev => {
        const updated = {};
        for (const [name, data] of Object.entries(prev)) {
          const currentStep = Math.min(step, data.steps.length - 1);
          updated[name] = {
            ...data,
            currentStep
          };
          
          const stepData = data.steps[currentStep];
          dataPoint[`${name}_comparisons`] = stepData.comparisons || 0;
          dataPoint[`${name}_swaps`] = stepData.swaps || 0;
        }
        return updated;
      });
      
      graphDataPoints.push(dataPoint);
      setGraphData([...graphDataPoints]);
    }
    
    setIsRunning(false);
  };

  const reset = () => {
    setSortingStates({});
    setStats({});
    setGraphData([]);
    setIsRunning(false);
  };

  const generateRandom = () => {
    const count = 15;
    const randomNums = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
    setInput(randomNums.join(', '));
    reset();
  };

  const algoNames = {
    bubble: 'Bubble Sort',
    selection: 'Selection Sort',
    insertion: 'Insertion Sort',
    merge: 'Merge Sort',
    quick: 'Quick Sort',
    heap: 'Heap Sort'
  };

  const activeAlgorithms = Object.entries(algorithms).filter(([_, active]) => active).map(([name]) => name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Sorting Algorithm Comparator
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Array (comma-separated numbers)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 64, 34, 25, 12, 22"
                  disabled={isRunning}
                />
                <button
                  onClick={generateRandom}
                  disabled={isRunning}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 flex items-center gap-2"
                >
                  <Plus size={20} /> Random
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Algorithms to Compare
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(algoNames).map(([key, name]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={algorithms[key]}
                      onChange={(e) => setAlgorithms({ ...algorithms, [key]: e.target.checked })}
                      disabled={isRunning}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: algoColors[key] }}
                      />
                      {name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Animation Speed: {speed}ms
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={runSorting}
                  disabled={isRunning || Object.values(algorithms).every(v => !v)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 flex items-center gap-2"
                >
                  <Play size={20} /> Sort
                </button>
                <button
                  onClick={reset}
                  disabled={isRunning}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 flex items-center gap-2"
                >
                  <RotateCcw size={20} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {graphData.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Activity size={24} className="text-indigo-600" />
                Real-Time Performance Graphs
              </h2>
              <button
                onClick={() => setShowGraph(!showGraph)}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
              >
                <BarChart3 size={20} />
                {showGraph ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showGraph && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Comparisons Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="step" 
                        label={{ value: 'Step', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis label={{ value: 'Comparisons', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      {activeAlgorithms.map(algo => (
                        <Line
                          key={algo}
                          type="monotone"
                          dataKey={`${algo}_comparisons`}
                          stroke={algoColors[algo]}
                          name={algoNames[algo]}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Swaps Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="step" 
                        label={{ value: 'Step', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis label={{ value: 'Swaps', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      {activeAlgorithms.map(algo => (
                        <Line
                          key={algo}
                          type="monotone"
                          dataKey={`${algo}_swaps`}
                          stroke={algoColors[algo]}
                          name={algoNames[algo]}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(sortingStates).map(([name, data]) => {
            const currentState = data.steps[data.currentStep];
            const isComplete = data.currentStep === data.steps.length - 1;
            
            return (
              <div key={name} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: algoColors[name] }}
                    />
                    {algoNames[name]}
                  </span>
                  {isComplete && <span className="text-green-500 text-sm">✓ Complete</span>}
                </h3>
                
                <div className="mb-4 flex items-end gap-1 h-48">
                  {currentState.array.map((val, idx) => {
                    const maxVal = Math.max(...currentState.array);
                    const height = (val / maxVal) * 100;
                    const isComparing = currentState.comparing.includes(idx);
                    const isSorted = currentState.sorted.includes(idx);
                    
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1">
                        <span className="text-xs font-semibold text-gray-600">{val}</span>
                        <div
                          className="w-full rounded-t transition-all duration-200"
                          style={{ 
                            height: `${height}%`,
                            backgroundColor: isSorted ? '#10b981' : isComparing ? '#ef4444' : algoColors[name]
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {stats[name] && (
                  <div className="text-sm space-y-1 text-gray-600 bg-gray-50 p-3 rounded">
                    <div className="flex justify-between">
                      <span>Comparisons:</span>
                      <span className="font-semibold">{stats[name].comparisons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Swaps:</span>
                      <span className="font-semibold">{stats[name].swaps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Steps:</span>
                      <span className="font-semibold">{stats[name].time}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {Object.keys(sortingStates).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Enter an array and click "Sort" to compare algorithms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingComparator;