        function getStoredArray() {
            if(localStorage.getItem("array") !== null) {
                return JSON.parse(localStorage.getItem("array"))
            } else {
                return []
            }
        }
        let listItems = getStoredArray()

        function storeArray() {
            const stringList = JSON.stringify(listItems)
            localStorage.setItem("array", stringList)
        }

        function addToList() {
            const addItem = document.getElementById("addNewItem").value
            listItems.push({task: addItem, checked: false, edit: false})
            storeArray()
            reloadList()
        }

        function checkUncheck(index) {
            listItems[index].checked = !listItems[index].checked
            storeArray()
        }

        function removeItem(index) {
            listItems.splice(index, 1)
            storeArray()
            reloadList()
        }

        function editItem(index) {
            listItems[index].task = document.getElementById("newTaskText").value
            listItems[index].edit = !listItems[index].edit
            storeArray()
            reloadList()
        }

        function editMode(index) {
            listItems[index].edit = !listItems[index].edit
            reloadList()
        }
        
        function reloadList() {
            const listForm = document.getElementById("list")
            listForm.innerHTML = ""

            listItems.forEach(function(item, index) {
                const itemId = "item" + index
    
                const newItem = document.createElement("input")
                newItem.setAttribute("type", "checkbox")
                newItem.setAttribute("id", itemId)
                newItem.checked = item.checked
                newItem.setAttribute("onclick", "checkUncheck(" + index + ")")

                let taskText
                let editButton

                if (item.edit == false) {
                    taskText = document.createElement("label")
                    taskText.setAttribute("for", itemId)
                    taskText.textContent = item.task
                    editButton = document.createElement("button")
                    editButton.textContent = "Modify"
                    editButton.setAttribute("id", 'edit-button')
                    editButton.setAttribute("onclick", "editMode(" + index + ")")
                } else {
                    taskText = document.createElement("input")
                    taskText.setAttribute("type", "text")
                    taskText.setAttribute("id", 'newTaskText')
                    editButton = document.createElement("button")
                    editButton.textContent = "Save"
                    editButton.setAttribute("id", 'save-button')
                    editButton.setAttribute("onclick", "editItem(" + index + ")")
                }

                const deleteButton = document.createElement("button")
                deleteButton.textContent = "x"
                deleteButton.setAttribute("id", 'delete-button')
                deleteButton.setAttribute("onclick", "removeItem(" + index + ")")

                const newLine = document.createElement("br")
    
                listForm.appendChild(newItem)
                listForm.appendChild(taskText)
                listForm.appendChild(editButton)
                listForm.appendChild(deleteButton)
                listForm.appendChild(newLine)
                
            })
        }

        reloadList()
