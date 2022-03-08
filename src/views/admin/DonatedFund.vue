<template>
    <base-card class="bg-light">
      <h3>$32,000 Fund raised from 160 donors!</h3>
       <table>
           <tr>
              <th>No</th>
              <th>Donors Name</th>
              <th>Donors Address</th>
              <th>Donated Amount</th>
              <th>Donated Date</th>
           </tr>
           <tr v-for="n in 10" :key="n">
              <td>{{n}}</td>
              <td>Zemene Kassie</td>
              <td>Toronto, Canada</td>
              <td>$100</td>
              <td>22/02/2020</td>
           </tr>
       </table>
       <div class="mt-2 d-flex justify-content-end">
          <select class="form-contro" aria-label="per page">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="20">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>

          <nav class="mx-3" aria-label="Page navigation" >
             <ul class="pagination mb-0">
               <li class="page-item">
                 <a class="page-link" href="#" aria-label="Previous">
                   <span aria-hidden="true">&laquo;</span>
                 </a>
               </li>
               <li class="page-item"><a class="page-link" href="#">1</a></li>
               <li class="page-item"><a class="page-link" href="#">2</a></li>
               <li class="page-item"><a class="page-link" href="#">3</a></li>
               <li class="page-item">
               <a class="page-link" href="#" aria-label="Next">
                 <span aria-hidden="true">&raquo;</span>
               </a>
              </li>
            </ul>
          </nav>

          <div class="fw-bold mt-2">Result 1-10 of 160</div>
   </div>

</base-card>
</template>
