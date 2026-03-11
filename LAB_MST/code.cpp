class Solution {
public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {

        int n = arr.size();
        vector<int> ans;

        int max_val = arr[0];  

        
        int i = 0;
        while(i < k) {
            if(arr[i] > max_val)
                max_val = arr[i];
            i++;
        }

        ans.push_back(max_val);

        i = 1;
        while(i <= n-k) {

            
            if(arr[i-1] == max_val) {

                max_val = arr[i];
                int j = i;

                while(j < i + k) {
                    if(arr[j] > max_val)
                        max_val = arr[j];
                    j++;
                }

            } 
            else {

                if(arr[i+k-1] > max_val)
                    max_val = arr[i+k-1];

            }

            ans.push_back(max_val);
            i++;
        }

          return ans;
    }
};
