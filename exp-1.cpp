// DAA Experiment 1
//Abhideep Jain - 24BCS10694
// Recurrence Relation: T(n) = 3T(n/2) + O(nlogn)
// Time Complexity: O(n^(log2(3))) here, base b = 2, a = 3
// k = logn, so k < logb(a) => O(n^(log2(3)))

//So for number of operations performed, I have calculated the number of basic operations inside the function complexRec.
// I didn't count the operations for function call overheads and returns as basic operations.

// for depth of recursion tree, I made a separate function to calculate it based on the input n.
// I did it because counting depth during the function execution would require global/static variables to keep track of current depth and max depth which would complicate the operation counting.
// I didn't choose any other method to avoid changing the structure of the original function too much.
// For exectution time, the code which was already provided to me in the doc sheet, that i have used.

#include <bits/stdc++.h>
using namespace std;
using namespace std::chrono;

long long int op = 0;


void complexRec(int n) {

   op++;
   if (n <= 2) {
       return;
   }


   int p = n;
   while (p > 0) {
       vector<int> temp(n);
       for (int i = 0; i < n; i++) {
           temp[i] = i ^ p;
           op++;
       }
       p >>= 1;
   }


   vector<int> small(n);
   for (int i = 0; i < n; i++) {
       small[i] = i * i;
       op++;
   }


   if (n % 3 == 0) {
       reverse(small.begin(), small.end());
       op=op+n;
   } else {
       reverse(small.begin(), small.end());
       op=op+n;
   }


   complexRec(n / 2);
   complexRec(n / 2);
   complexRec(n / 2);
}

int recursion_depth(int n) {
   if (n <= 2) {
       return 0;
   }
   return 1 + recursion_depth(n / 2);
}

int main()
{
    int n;
    cin >> n;
    auto start = high_resolution_clock::now();
    complexRec(n);
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "Number of operations performed: " << op << endl; 
    cout << "depth of the recursion tree: " << recursion_depth(n) << endl;
    cout << "execution time is " << duration.count() << " milliseconds" << endl;
    return 0;
}