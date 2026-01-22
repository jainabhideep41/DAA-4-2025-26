#include <bits/stdc++.h>
using namespace std;
struct Node {
    int data;
    Node* prev;
    Node* next;
};
Node* createNode(int val) {
    Node* n = new Node();
    n->data = val;
    n->prev = nullptr;
    n->next = nullptr;
    return n;
}

Node* insertAtHead(Node* head, int val) {
    Node* n = createNode(val);
    if (head == nullptr)
        return n;
    n->next = head;
    head->prev = n;
    return n;
}

Node* insertAtEnd(Node* head, int val) {
    Node* n = createNode(val);
    if (head == nullptr)
        return n;
    Node* temp = head;
    while (temp->next != nullptr)
        temp = temp->next;
    temp->next = n;
    n->prev = temp;
    return head;
}

Node* insertAtPosition(Node* head, int val, int pos) {
    if (pos == 1)
        return insertAtHead(head, val);

    Node* temp = head;
    int count = 1;

    while (count< pos - 1 && temp != nullptr) {
        temp = temp->next;
        count++;
    }

    if (temp == nullptr)
        return head;

    Node* n = createNode(val);
    n->next = temp->next;
    n->prev = temp;

    if (temp->next != nullptr)
        temp->next->prev = n;

    temp->next = n;
    return head;
}

Node* deleteHead(Node* head) {
    if (head == nullptr)
        return nullptr;

    Node* temp = head;
    head = head->next;

    if (head != nullptr)
        head->prev = nullptr;

    delete temp;
    return head;
}

Node* deleteEnd(Node* head) {
    if (head == nullptr || head->next == nullptr) {
        delete head;
        return nullptr;
    }

    Node* temp = head;
    while (temp->next != nullptr)
        temp = temp->next;

    temp->prev->next = nullptr;
    delete temp;
    return head;
}

Node* deleteByValue(Node* head, int val) {
    if (head == nullptr)
        return nullptr;

    Node* temp = head;

    while (temp != nullptr) {
        if (temp->data == val) {

            if (temp->prev != nullptr)
                temp->prev->next = temp->next;
            else
                head = temp->next;

            if (temp->next != nullptr)
                temp->next->prev = temp->prev;

            delete temp;
            return head;
        }
        temp = temp->next;
    }
    return head;
}

void displayFromStart(Node* head) {
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

void displayFromEnd(Node* head) {
    if (head == nullptr)
        return;

    Node* temp = head;
    while (temp->next != nullptr)
        temp = temp->next;

    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->prev;
    }
    cout << endl;
}


int main() {
    Node* head = nullptr;

    head = insertAtHead(head, 10);
    head = insertAtEnd(head, 20);
    head = insertAtEnd(head, 30);
    head = insertAtPosition(head, 25, 3);
 displayFromStart(head);
               displayFromEnd(head);
  head = deleteHead(head);
    head = deleteEnd(head);
    head = deleteByValue(head, 25);
displayFromStart(head);
    displayFromEnd(head);
  return 0;
}
