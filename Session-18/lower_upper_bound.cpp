#include<iostream> 
using namespace std; 

int lb(int arr[], int n, int target){ 
   
    int temporary = -1; 
    
    int left = 0; 
    int right = n - 1; 
    int mid = 0; 
    
    while(left <= right) { 
        
        mid = left + (right - left) / 2; 
        if(arr[mid] >= target) 
        { 
            temporary = mid; 
            right = mid - 1; 
        } 
        else 
        {
            left = mid + 1; 
        } 
    } 
    return temporary; 
} 

int ub(int arr[], int n, int target){ 
   
    int temporary = -1; 
    
    int left = 0; 
    int right = n - 1; 
    int mid = 0; 
    
    while(left <= right) { 
        
        mid = left + (right - left) / 2; 
        if(arr[mid] > target) 
        { 
            temporary = mid; 
            right = mid - 1; 
        } 
        else 
        {
            left = mid + 1; 
        } 
    } 
    return temporary; 
} 

int main() { 
    int arr[8] = {2, 3, 3, 3, 6, 7, 8, 9}; 
    int target = 5; 
    int n = 8; 
    
    cout << "Lower Bound Index: " << lb(arr, n, target) << endl; 
    cout << "Upper Bound Index: " << ub(arr, n, target) << endl; 
    
    return 0; 
}
